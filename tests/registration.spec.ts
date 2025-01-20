import { test, expect } from '@playwright/test';
import RegistrationFormPage from '../pages/registrationFormPage';
import { deleteByEmail, getRandomEmail } from '../utils/dbUtils';
import { environments } from '../playwright.config';

environments.forEach((env) => {
  test.describe(`Registration Form Tests for Environment: ${env.baseURL}`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`${env.baseURL}`);
    });

    test('TC-01: Verify required fields for first step', async ({ page }) => {
      const registrationForm = new RegistrationFormPage(page);

      // Assert all fields are empty initially
      await expect(registrationForm.parentNameField).toBeEmpty();
      await expect(registrationForm.emailField).toBeEmpty();
      await expect(registrationForm.contactNumberField).toBeEmpty();
      await expect(registrationForm.childBirthYearField).toBeEmpty();

      // Assert checkboxes are unchecked initially
      await expect(registrationForm.termsCheckbox).not.toBeChecked();
      await expect(registrationForm.marketingCheckbox).not.toBeChecked();

      // Attempt to submit the form without filling any fields
      await registrationForm.submitButton.click();

      // Asserts
      await expect(registrationForm.parentNameError).toHaveText('Pole jest wymagane');
      await expect(registrationForm.emailError).toHaveText('Pole jest wymagane');
      await expect(registrationForm.phoneNumberError).toHaveText('Pole jest wymagane');
      await expect(registrationForm.birthYearError).toHaveText('Pole jest wymagane');
      await expect(registrationForm.completedSteps).not.toBeVisible();
      await expect(registrationForm.submitButton).toBeVisible();
    });

    test('TC-02: Verify invalid email error message', async ({ page }) => {
      const registrationForm = new RegistrationFormPage(page);

      // Fill an invalid email and submit the form
      await registrationForm.emailField.fill('user#example.com');
      await registrationForm.submitButton.click();

      // Asserts
      await expect(registrationForm.emailError).toHaveText('Nieprawidłowy adres e-mail');
      await expect(registrationForm.completedSteps).not.toBeVisible();
      await expect(registrationForm.submitButton).toBeVisible();
    });

    test('TC-03: Verify invalid phone number error message', async ({ page }) => {
      const registrationForm = new RegistrationFormPage(page);

      // Fill an invalid phone number and submit the form
      await registrationForm.contactNumberField.fill('12345');
      await registrationForm.submitButton.click();

      // Asserts
      await expect(registrationForm.phoneNumberError).toContainText('Niepoprawny numer telefonu');
      await expect(registrationForm.completedSteps).not.toBeVisible();
      await expect(registrationForm.submitButton).toBeVisible();
    });

    test('TC-04: Verify valid form submission for the first step', async ({ page }) => {
      const registrationForm = new RegistrationFormPage(page);
      const secondStepActive = page.locator(
        '[class="feature_registration-menu__item d-flex align-items-center justify-content-center feature_registration-menu__item--active"]',
        { hasText: "Typ kursu" }
      );

      // Fill valid data in all required fields
      registrationForm.fillStep1('Artur', 'karolgiganci+fakedata80696@gmail.com', '123456651', '2005');

      // Asserts
      await expect(registrationForm.completedSteps).toHaveCount(1);
      await expect(secondStepActive).toBeVisible();
    });

    test('TC-05: Verify full registration flow', async ({ page }) => {
      const registrationForm = new RegistrationFormPage(page);
      const randomEmail = getRandomEmail('karolgiganci');

      // Step 1: Fill valid data for the first step
      registrationForm.fillStep1('Artur', randomEmail, '123456651', '2005');

      // Step 2: Select course options
      registrationForm.fillStep2(env.programmingButton, env.onlineKinds, env.coursesButton, env.aiButton);

      // Step 3: Select available slot
      registrationForm.fillStep3();

      // Step 4: Fill student and guardian information
      registrationForm.fillStep4('Maciej', 'Testowy', 'Testowy', '26-900');

      // Remove user from db
      deleteByEmail(randomEmail);

      // Asserts
      await expect(registrationForm.completedSteps).toHaveCount(5);
      await expect(registrationForm.agreementStepSubmit).toBeVisible();
    });
  });
});
