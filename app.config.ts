import { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? "pillme(Dev)" : "pillme",
  slug: "pillme",
  version: "1.0.0",
  orientation: "default",
  icon: "./assets/icon.png",
  scheme: "pillme",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: IS_DEV ? "com.ynishisaki.pillme_dev" : "com.ynishisaki.pillme",
    versionCode: 21,
  },
  plugins: [
    "expo-router",
    [
      "expo-font",
      {
        fonts: [
          "node_modules/@expo-google-fonts/noto-sans-jp/NotoSansJP_300Light.ttf",
          "node_modules/@expo-google-fonts/noto-sans-jp/NotoSansJP_400Regular.ttf",
          "node_modules/@expo-google-fonts/noto-sans-jp/NotoSansJP_500Medium.ttf",
          "node_modules/@expo-google-fonts/noto-sans-jp/NotoSansJP_700Bold.ttf",
        ],
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          minSdkVersion: 23,
          compileSdkVersion: 34,
          targetSdkVersion: 34,
          versionCode: 20,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
  owner: "ynishisaki",
});
