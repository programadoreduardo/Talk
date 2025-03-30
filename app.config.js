export default {
  expo: {
    name: "talk",
    slug: "talk",
    version: "1.0.0",
    orientation: "portrait",
    icon: "",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "",
        backgroundColor: "#ffffff"
      },
      package: "com.anonymous.talk" // 🔥 Adicione essa linha
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      apiKey: process.env.GOOGLE_API_KEY
    }
  }
};
