import { Page, Locator } from "@playwright/test";

export default class RegistrationFormPage  {
  readonly page: Page;

   // Step 0: Common
   readonly completedSteps: Locator;

   // Step 1: Parent and child information
   readonly parentNameField: Locator;
   readonly emailField: Locator;
   readonly contactNumberField: Locator;
   readonly childBirthYearField: Locator;
 
   // Step 1: Checkboxes
   readonly termsCheckbox: Locator;
   readonly marketingCheckbox: Locator;
 
   // Step 1: Submit button
   readonly submitButton: Locator;
 
   // Step 1: Error messages
   readonly parentNameError: Locator;
   readonly emailError: Locator;
   readonly phoneNumberError: Locator;
   readonly birthYearError: Locator;
 
   // Step 2: Course selection
   readonly onlineForKidsButton: Locator;

 
   // Step 3: Available slots
   readonly buttonWithAvailableSlots: Locator;
 
   // Step 4: Student and guardian information
   readonly studentFirstnameInput: Locator;
   readonly studentLastnameInput: Locator;
   readonly parentLastnameInput: Locator;
   readonly zipCodeInput: Locator;
   readonly registrationSubmitButton: Locator;

   // Step 5:
   readonly agreementStepSubmit: Locator;

  constructor(page: Page) {
    this.page = page;

        // Step 0
        this.completedSteps = page.locator('.feature_registration-menu__item--completed');

        // Step 1
        this.parentNameField = page.locator('input[name="parentName"]');
        this.emailField = page.locator('input[name="email"]');
        this.contactNumberField = page.locator('input[name="phoneNumber"]');
        this.childBirthYearField = page.locator('input[name="birthYear"]');
        this.termsCheckbox = page.locator('[for="statuteAgreed"].form-check-label .icon');
        this.marketingCheckbox = page.locator('[for="advertisementAgreed"].form-check-label .icon');
        this.submitButton = page.locator('[form="submit-payment"]');
        this.parentNameError = page.locator('label[for="parentName"] ~ div .formError');
        this.emailError = page.locator('label[for="email"] ~ div .formError');
        this.phoneNumberError = page.locator('label[for="phoneNumber"] ~ div .formError');
        this.birthYearError = page.locator('label[for="birthYear"] ~ div .formError');
    
        // Step 2
        this.onlineForKidsButton = page.locator('[value="onlineKinds"]');
    
        // Step 3
        this.buttonWithAvailableSlots = page.locator(
          'div:has-text("Wolnych miejsc:") >> button:has-text("Wybierz")'
        ).first();
    
        // Step 4
        this.studentFirstnameInput = page.locator('[name="student_firstname"]');
        this.studentLastnameInput = page.locator('[name="student_lastname"]');
        this.parentLastnameInput = page.locator('[name="lastname"]');
        this.zipCodeInput = page.locator('[name="zip_code"]');
        this.registrationSubmitButton = page.locator('#registration-step-submit');

        // Step 5
        this.agreementStepSubmit = page.locator('#agreement-step-submit');
      }
  
      async fillStep1(parentName: string, email: string, phoneNumber: string, birthYear: string) {
        await this.parentNameField.fill(parentName);
        await this.emailField.fill(email);
        await this.contactNumberField.fill(phoneNumber);
        await this.childBirthYearField.fill(birthYear);
        await this.termsCheckbox.check();
        await this.marketingCheckbox.check();
        await this.submitButton.click();
      }
    
      async fillStep2(courseTypeText: string, modeText: string, difficultyLevel: string, subject: string ) {
        const courseButton = this.page.locator(`button:has-text("${courseTypeText}")`);
        const modeButton = this.page.locator(`[value="${modeText}"]`);
        const difficultyButton = this.page.locator(`button:has-text("${difficultyLevel}")`);
        const mainSubject = this.page.locator(`[data-name="${subject}"] #registration-step-select-course-registered`);

        await courseButton.click();
        await modeButton.click();
        await difficultyButton.click();
        await mainSubject.click();
      }
    
      async fillStep3() {
        await this.buttonWithAvailableSlots.click();
      }
    
      async fillStep4(firstName: string, lastName: string, parentLastName: string, zipCode: string) {
        await this.studentFirstnameInput.fill(firstName);
        await this.studentLastnameInput.fill(lastName);
        await this.parentLastnameInput.fill(parentLastName);
        await this.zipCodeInput.fill(zipCode);
        await this.registrationSubmitButton.click();
      }
}