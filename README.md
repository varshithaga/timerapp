# ⏱️ Smart Timer App

A beautifully designed, customizable Timer Manager built with **Expo** and **React Native**. It supports multiple timers, category grouping, halfway alerts, dark/light mode toggling, and timer history — all powered by `AsyncStorage`.

---

## 🚀 Features

- ⏳ Create unlimited timers with custom names, durations, and categories.
- 🗂️ Group timers by category with expandable/collapsible views.
- 🚀 Bulk Start / Pause / Reset per category — manage timers efficiently.
- 🎯 Halfway alerts to notify you at 50% completion.
- 📊 Visual progress bar and percentage tracker for each timer.
- 🌘 Dark and Light mode toggle for personalized viewing.
- 🕓 Timer history log with completion time, name, and duration.
- 📤 Export history log as JSON for analysis or backup.
- 🧠 Local persistence using AsyncStorage — fully offline-capable.
- 🎛️ Filter by category with a stylish dropdown selector.

📱 Responsive UI designed for both Android and iOS using Expo Router.
---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/varshithaga/timerapp.git
cd timerapp

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






