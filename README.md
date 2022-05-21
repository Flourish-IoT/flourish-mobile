## Getting Started

Clone the repo to your local computer

1. In your terminal `cd` to the project root folder and run `npm install`.
2. Install the expo cli globally with `npm install -g expo-cli@5.0.3`.
3. Install eslint for VSCode: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
4. Add the environment file
    - Download: https://drexel0.sharepoint.com/:u:/r/sites/SeniorProject309/Shared%20Documents/Dev/Front-End%20Research/secret.env?csf=1&web=1&e=YXJeuv
    - Rename to just `.env`
    - Place the file in the root level of the project.
5. (Optional) Install a mobile simulator:

    - Mac: Xcode or Android Simulator
    - Windows: Android Simulator
        > [Android Simulator Setup Instructions](https://drexel0.sharepoint.com/:o:/r/sites/SeniorProject309/Shared%20Documents/Dev/Front-End%20Research/Research?d=wf8b2f89e9edc44af83276e2f12223827&csf=1&web=1&e=AV77dR)

## Available Scripts

In the project directory, you can run:

### Launch Expo: `npm start`

Launches Expo and opens the Expo console automatically in your browser.

Expo compiles the React Native code for iOS, Android, and Web. Though not all features are available across each..

    - For example: Smooth Stack Navigation

Expo will also automatically re-compile when you save files and refresh your browser or device using something called "Hot-Reloading" with React using the state management. So you don't usually need to reload manually depending on the update you made.

## Live Preview

From here you can launch your mobile simulator:

    - "Run on iOS Simulator"
    - "Run on Android Device/Simulator"

#### ~ OR ~

On your mobile device you can download the "Expo Go" app.

    - Sign up for a student account with a .edu email.
    - Scan the QR code in the Expo Console to run the app.

## Important Notes

1. **DO NOT** commit sensitive information to this repo. It's public.
    - API keys and environment specific variables should go into the environment variables where it is not tracked by git.
2. 99% of the time we should be making pull requests with new branches to mere code into the "Development" branch.
3. React Native gets us most of the way there for compiling. But some things will still need to be platform specific.
    - Ex. accessing the camera or photos.
    - Use the `Platform.OS` variable in the code to detect what platform you are running when developing similar features. It will be a string of either "ios" or "android".
4. In order to maintain the global theme, use components from the correct packages/locations. The import priority order is: `./lib/components/styled/` > `react-native-paper` > `react-native`.
