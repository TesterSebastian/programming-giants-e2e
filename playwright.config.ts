import { defineConfig, devices } from '@playwright/test';

export const environments = [
  {
    baseURL: "https://devtest.giganciprogramowania.edu.pl/zapisz-sie",
    programmingButton: "PROGRAMOWANIE",
    onlineKinds: "onlineKinds", // jak już będą ID to dane do selektorów będą zbędne
    coursesButton: "Roczne kursy z programowania", // jak już będą ID to dane do selektorów będą zbędne
    aiButton: "pierwsze kroki w programowaniu (kurs z elementami ai) online",
    avialibleSlotButton: "Wolnych miejsc:",
    chooseButton: "Wybierz",
  },
  // {
  //   baseURL: "https://production.giganciprogramowania.edu.pl/zapisz-sie", // TUTAJ np. ENG
  //   programmingButton: "PROGRAMMING", // jak już będą ID to dane do selektorów będą zbędne
  //   coursesButton: "Annual Programming Courses",
  //   onlineKinds: "onlineKinds",
  //   aiButton: "First steps in programming with AI online",
  //   avialibleSlotButton: "Slots Available:",
  //   chooseButton: "Choose",
  // },
];



export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html']],
  timeout: 600000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 1280 },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

});
