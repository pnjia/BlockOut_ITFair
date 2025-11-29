# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Connect Android device to the local backend

To call the API that runs on your laptop (`localhost:3000`) from a real Android device:

1. Make sure your laptop and the Android device share the same Wi-Fi network (or keep the device connected via USB with ADB running).
2. Run your backend server so it listens on `0.0.0.0` (or the laptop's LAN IP) at port `3000`.
3. Export the API URL/IP before building or launching the Android app. This value is packaged into the app for `npx expo run:android` and read at runtime for dev clients:

   ```bash
   export EXPO_PUBLIC_API_URL=http://192.168.0.42:3000
   ```

   Replace `192.168.0.42` with your laptop’s IP address. For USB debugging with `adb reverse tcp:3000 tcp:3000`, you can set `http://localhost:3000`. Alternatively, provide `EXPO_PUBLIC_API_HOST=192.168.0.42` and keep the default protocol/port.

4. Install/run the Android build directly on the device:

   ```bash
   npx expo run:android
   ```

   This generates/updates the native project if needed, installs the debug build on the connected device/emulator, and starts Metro automatically.

5. If you still prefer the classic Expo development server for Expo Go or other clients, you can run:

   ```bash
   EXPO_PUBLIC_API_URL=http://192.168.0.42:3000 npx expo start --dev-client
   ```

With the environment variable set, the app will call your backend at the provided IP/port in both workflows.

Note: the app now defaults to using the deployed backend for Android builds when no `EXPO_PUBLIC_API_URL` / `EXPO_PUBLIC_API_HOST` is provided. The default remote is:

```
https://block-out-be-it-fair.vercel.app/
```

If you want your Android device to call your laptop instead, set `EXPO_PUBLIC_API_URL` to `http://<your-laptop-ip>:3000` before running `npx expo run:android`.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
