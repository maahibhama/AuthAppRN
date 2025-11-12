# AuthAppRN

A React Native authentication application with role-based access control, supporting both admin and normal user functionalities.

## Features

### Authentication
- User registration (Signup)
- User login
- Persistent session using AsyncStorage
- Automatic navigation based on authentication state

### User Roles

#### Normal Users
- Can register and login
- Can view their profile information (name, email, user type)
- Cannot access admin features
- Cannot manage other users

#### Admin Users
- All normal user capabilities
- **Admin Detection**: Users with "admin" in their email (case-insensitive) are automatically assigned admin role
- Can view all registered users
- Can delete non-admin users
- Access to "All Users" screen from the home screen

## Prerequisites

- **Node.js**: Version >= 20 (required)
- **npm**: Version > 20 (required for `npm start` with React Native 0.82.1)
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

## Installation

1. **Switch to Node.js 20** (if using nvm):
   ```bash
   nvm use 20
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **iOS Setup** (if running on iOS):
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the App

### Start Metro Bundler
```bash
npm start
```

**Important**: Make sure you're using Node.js version >= 20 and npm version > 20 before running `npm start`. If you're using nvm, run `nvm use 20` first.

### Run on iOS
```bash
npm run ios
```

### Run on Android
```bash
npm run android
```

## Project Structure

```
src/
├── assets/          # Images, Lottie animations
├── components/      # Reusable components (Button, etc.)
├── context/         # AuthContext for global state management
├── navigation/      # App navigation configuration
├── screens/         # Screen components
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── HomeScreen.tsx
│   └── AllUsers.tsx
└── utils/           # Utility functions (validation, etc.)
```

## How Admin System Works

1. **Admin Assignment**: During signup, if the email contains "admin" (case-insensitive), the user is automatically assigned admin privileges (`isAdmin: true`).

2. **Admin Features**:
   - Admin users see an "All Users" button on the Home screen
   - They can navigate to view all registered users
   - They can delete any non-admin user
   - Admin users cannot be deleted by other admins

3. **Normal Users**:
   - Do not see the "All Users" button
   - Cannot access the AllUsers screen
   - Can only view and manage their own profile

## Technologies Used

- React Native 0.82.1
- React Navigation 7.x
- AsyncStorage (for local data persistence)
- Lottie React Native (for animations)
- TypeScript

## Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Notes

- User data is stored locally using AsyncStorage
- Admin status is determined at signup based on email content
- The app uses a splash screen that checks for existing user sessions on launch
