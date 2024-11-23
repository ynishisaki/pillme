import { defineEasConfig } from "eas-config-ts";
// import "dotenv/config";

export default defineEasConfig({
  cli: {
    version: ">= 3.9.1",
  },
  build: {
    development: {
      // env: process.env,
      env: {
        APP_VARIANT: "development",
      },
      developmentClient: true,
      distribution: "internal",
      android: {
        gradleCommand: ":app:assembleDebug",
        buildType: "apk",
      },
    },
    preview: {
      distribution: "internal",
      android: {
        gradleCommand: ":app:assembleRelease",
        buildType: "apk",
      },
    },
    production: {
      autoIncrement: true,
    },
  },
  submit: {
    production: {
      android: {
        track: "production",
        serviceAccountKeyPath: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
      },
    },
  },
});
