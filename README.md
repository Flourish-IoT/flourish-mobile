## Getting Started

Clone the repo to your local computer

1. In your terminal `cd` to the project root folder and run `npm install`.
2. Install your preferred simulator:

    - Mac: Xcode or Android Simulator
    - Windows: Android Simulator

## Available Scripts

In the project directory, you can run:

### Launch Expo: `npm start`

Launches Expo and opens the Expo console automatically in your browser.

Expo compiles the React Native code for iOS, Android, and Web. Though not all features are available across each..

    - For example: Smooth Stack Navigation

Expo will also automatically re-compile when you save files and refresh your browser or device using something called "Hot-Reloading" with React using the state management. So you don't usually need to reload manually depending on the update you made.

From here you can launch your app simulator:

    - "Run on iOS Simulator"
    - "Run on Android Device/Simulator"
    - "Run in web browser" (Good for debugging network requests)

## Live Mobile Preview

On your mobile device you can download the "Expo Go" app.

    - Sign up for a student account with a .edu email.
    - Scan the QR code in the Expo Console to run the app.

## Important Notes

1. **DO NOT** commit sensitive information to this repo. It's public.
    - API keys and environment specific variables should go into the environment variables where it is not tracked by git.
2. 99% of the time we should be making pull requests with new branches to mere code.
3. React Native gets us most of the way there for compiling. But some things will still need to be platform specific.
    - Ex. accessing the camera or photos.
    - Use the Platform.OS variable to detect what platform you are running when developing similar features. It will either be "ios" or "android".
