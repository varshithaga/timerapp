# ⏱️ Smart Timer App

A beautifully designed, customizable Timer Manager built with **Expo** and **React Native**. It supports multiple timers, category grouping, halfway alerts, dark/light mode toggling, and timer history — all powered by `AsyncStorage`.

---

## 🚀 Features

- ⏳ **Create unlimited timers** with custom names, durations, and categories.
- 🗂️ **Group timers by category** with expandable/collapsible views.
- 🚀 **Bulk controls**: Start / Pause / Reset all timers in a category.
- 🎯 **Halfway alerts** to keep you notified mid-progress.
- 📊 **Progress bar and percentage** for each timer.
- 🌘 **Toggle between Dark and Light mode** with one tap.
- 🕓 **Timer history log** showing completion time, name, and duration.
- 🧠 **Local storage using AsyncStorage** — works offline too.
- 🎛️ **Filter by category** with a stylish dropdown.
- 📱 Responsive design for Android & iOS using **Expo Router**
---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/timer-app.git
cd timer-app

```

## 2. Install Dependencies

```bash
npm install

```

## 3. Start the App

```bash
npx expo start

```

You can now choose to run the app in:

📱 Expo Go on Android/iOS


## 📁 Project Structure

```bash
timer-app/
│
├── app/                  # Screens and tabs (Home, Timer, History)
│   ├── index.tsx         # Welcome screen
│   ├── timer.tsx         # Main timer screen
│   └── history.tsx       # Timer history screen
│
├── components/           # Reusable UI components
├── utils/
│   └── themes.js         # Light & dark theme colors
├── assets/               # App images and icons
└── README.md


```

## 🛠️ Tech Stack

```bash

⚛️ React Native + TypeScript

📦 Expo + Expo Router

💾 AsyncStorage (local persistence)

🎨 Custom themes (dark/light)

🧭 React Navigation

🧩 Modular structure for scalability

```


Your project is structured like this — all in a single cohesive structure:

app/index.tsx → Welcome screen with buttons to navigate to Timer or History

app/timer.tsx → Main Timer screen to create, start, pause, reset, delete timers

app/history.tsx → Timer history screen to view completed timers

components/HelloWave.tsx → Fun reusable animated greeting

utils/themes.js → Contains lightTheme and darkTheme configuration

app/_layout.tsx → Tab navigation setup with icons for Home, Explore, Timer, and History

assets/ → Store icons, images (if needed)

App.js / app.config.js → Expo config files

README.md → You’re reading it!






