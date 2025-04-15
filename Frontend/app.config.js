import 'dotenv/config';

export default {
  expo: {
    name: "UserInterface",
    slug: "UserInterface",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true
    },

    android: {
      package: "com.ammar.almutasaweq",
      adaptiveIcon: {
        foregroundImage: "./src/Assets/images/logo.png",
        backgroundColor: "#ffffff"
      }
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/Assets/images/logo.png"
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./src/Assets/images/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],

    experiments: {
      typedRoutes: true
    },

    updates: {
      url: "https://u.expo.dev/008a3683-266a-471c-b6e8-1db6c493eaa7"
    },

    runtimeVersion: {
      policy: "appVersion"
    },

    extra: {
      eas: {
        projectId: "008a3683-266a-471c-b6e8-1db6c493eaa7"
      },
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL
    }
  }
};
