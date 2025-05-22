


# Exercise2: React Native Messaging App with Expo Router

## Overview
Exercise2 is a simple messaging app built with React Native and Expo Router. It allows users to create, edit, and delete groups, and within each group, users can send, edit, and delete messages. The app features a clean UI with modals for adding/editing groups and messages, and it runs on both web and mobile platforms (iOS/Android).

**Created on**: May 21, 2025  
**Last Updated**: May 21, 2025

## Features
- Create, edit, and delete groups.
- Send, edit, and delete messages within each group.
- Responsive design for web and mobile.
- Modals for user interactions (e.g., adding/editing groups and messages).
- Navigation using Expo Router.

## Screenshots
- Edit group name, Delete group, and the results of group deleted
![image](https://github.com/user-attachments/assets/49476c01-edd3-4531-ad10-b6150e6fcc2a)
- Edit message, Delete/Send message, and the results of message Send
![image](https://github.com/user-attachments/assets/df645086-5fb4-4c39-b9b1-8cc7b948663c)

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js**: Version 16 or higher (18.x or 20.x recommended).
- **npm**: Version 9.x or higher (comes with Node.js).
- **Expo CLI**: Install globally with `npm install -g expo-cli`.
- **Expo Go**: Install the Expo Go app on your iOS or Android device for mobile testing.
- **Android Studio** or **Xcode**: For emulator testing (optional).

## Installation
1. **Clone or Download the Project**:
   - If you received this as a zip file, unzip it to `D:\Codes\exercise2` (or your preferred directory).
   - If using Git, clone the repository:
     ```bash
     git clone <repository-url>
     cd exercise2
     ```

2. **Install Dependencies**:
   - Navigate to the project directory and install the required packages:
     ```bash
     cd D:\Codes\exercise2
     npm install
     ```
   - Install additional dependencies:
     ```bash
     npm install react-native-modal
     ```

## Configuration
- **TypeScript**: The `tsconfig.json` is already configured with `moduleResolution: "bundler"` for Expo Router compatibility.
- **Assets** (Optional): If you deleted the `assets` directory to reduce zip size, ensure `app.json` does not reference missing files (e.g., `icon`, `splash`). The provided `app.json` is already updated to remove these references.
- **Expo Router**: The `app.json` includes `"expo-router"` in the `plugins` array to enable routing.

## Running the Project
1. **Start the Development Server**:
   - Run the following command to start the Expo server:
     ```bash
     npx expo start -c
     ```
   - The `-c` flag clears the cache to ensure a fresh start.

2. **Test on a Device**:
   - Open the Expo Go app on your iOS or Android device.
   - Scan the QR code displayed in the terminal or Expo Dev Tools (web interface).
   - The app should load on your device.

3. **Test on an Emulator**:
   - Press `a` in the terminal to open an Android emulator (requires Android Studio setup).
   - Press `i` to open an iOS simulator (requires Xcode setup on macOS).
   - Alternatively, press `w` to open the app in a web browser.

## Usage
- **Home Screen** (`app/index.tsx`):
  - Displays a list of groups.
  - Click the "+" button (bottom-right) to add a new group.
  - Use "Edit" and "Delete" buttons next to each group to modify or remove it.
  - Click a group name to navigate to its Messages screen.

- **Messages Screen** (`app/[groupName].tsx`):
  - Shows the messages for the selected group.
  - Type a message in the input field and press "Send" to add it.
  - Use "Edit" and "Delete" buttons (aligned to the right) to modify or remove messages.

## Project Structure
The project is structured as follows within `D:\Codes\exercise2`:

```
D:\Codes\exercise2
├── app
│   ├── _layout.tsx        # Expo Router layout configuration
│   ├── index.tsx         # Home screen (group list)
│   └── [groupName].tsx   # Messages screen for each group
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration for Expo Router
├── expo-env.d.ts         # TypeScript declarations for Expo
├── metro.config.js       # Metro bundler configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

**Optional Files (May Not Be Present)**:
- `assets/`: Contains app icons and splash screens (can be deleted if not used).
- `README.pdf`: Generated documentation (not required for runtime).
- `node_modules/`: Dependencies (regenerated with `npm install`).
- `.expo/`: Expo CLI metadata (regenerated on `npx expo start`).

## Troubleshooting
- **TypeScript Errors**:
  - Ensure `tsconfig.json` has `moduleResolution: "bundler"`.
  - Check for typos in style names (e.g., `groupIconText` must be defined in `StyleSheet.create`).
- **Missing Dependencies**:
  - Run `npm install` to install missing packages.
  - Verify `react-native-modal` is installed.
- **Default Welcome Page**:
  - Ensure `app.json` includes `"expo-router"` in the `plugins` array.
  - Verify the `app/` directory contains `_layout.tsx`, `index.tsx`, and `[groupName].tsx`.
- **Asset Errors**:
  - If `assets` directory is missing, ensure `app.json` does not reference `icon`, `splash`, etc.
- **Navigation Issues**:
  - Check that Expo Router is installed (`npm install expo-router`).
  - Clear cache with `npx expo start -c`.

## Notes
- **Dependencies**: The project uses `expo-router` for navigation and `react-native-modal` for modals. Ensure these are listed in `package.json`.
- **Zip Size**: If zipping the project, exclude `node_modules`, `.expo`, and `.git` to reduce size (see instructions in previous responses).
- **Time Consideration**: Generated at 11:20 PM EDT on May 21, 2025. If working late, consider taking a break!

## License
This project is for educational purposes and does not include a specific license. Use and modify as needed for personal learning.
