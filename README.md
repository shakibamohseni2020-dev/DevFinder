# DevFinder

A mobile app that helps developers find peers in their geographic area, fostering new projects, knowledge sharing, and professional growth.

## What it does

- A new user signs up with their GitHub username.
- The app reads their GPS location and registers them in a community backend.
- All registered developers in the community appear as pins on a shared map.
- Tapping a pin reveals the developer's name and bio; tapping the tooltip opens their GitHub profile.

## Tech stack

- [Expo](https://expo.dev/) (React Native) with TypeScript
- [React Navigation](https://reactnavigation.org/) for screen routing
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) for the map view
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) for the GPS sensor
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/) for the local cache
- [json-server](https://github.com/typicode/json-server) as a fake backend during development

## Forking this project

Each fork is expected to:

1. Customize branding (colors in `src/theme/colors.ts`).
2. Run its own backend service in whatever language and infrastructure it prefers.
3. Optionally translate UI strings, change the seed users in `db.json`, etc.

The app talks to the backend through a single file (`src/services/api.ts`), so swapping in a different backend only requires changing the `baseUrl` and, if the response shape differs, the parsing in that file.

## Local setup

### Prerequisites

- Node.js 18+
- npm (or yarn)
- [Expo Go](https://expo.dev/client) on your phone (iOS or Android)

### Install

```bash
npm install
```

### Configure your environment

Copy the example env file and fill in your computer's local IP address. Your phone needs to reach the backend running on your laptop, so we use your LAN IP rather than `localhost`.

```bash
cp .env.example .env
```

Then edit `.env`: