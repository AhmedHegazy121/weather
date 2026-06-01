# 🌤️ [Weather Dashboard Project](https://github.com)

A professional, responsive Weather Dashboard application built with React and styled beautifully using Material UI (MUI v5). This project features dynamic live data loading using Axios, responsive Right-to-Left (RTL) / Left-to-Right (LTR) context switching, and a polished frosted glassmorphism card theme layout.

---
<div align="center">
  <img 
    src="weather.png" 
    alt="Weather Dashboard Project Preview" 
    style="
      max-width: 600px; 
      height: auto; 
      border-radius: 16px; 
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3); 
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin: 20px 0;
    "
  />
</div>
## ✨ Features

* **Real-time Live API Integration**: Dynamic telemetry metrics pulled seamlessly via `axios` from official weather endpoints.
* **Modern Centered UI Branding**: The dynamic condition image icon is centered right next to the city location title, framed in a sleek rounded profile with multi-layered glowing drop shadows.
* **Frosted Glassmorphism Theme**: Translucent dark card aesthetics (`rgba(21, 41, 78, 0.75)`) utilizing high-end blur backdrop filters for premium depth.
* **Full Dual-Language Localization**: Instant context language swapping between Arabic and English via `react-i18next` and `moment.js` locale strings.
* **Memory Leak Mitigation**: Structural cleanups that cancel pending async calls if a user navigates away mid-request.

---

## 🏗️ Project Architecture & Folder Tree

The layout keeps your UI views completely clean and separated from assets or setup configurations:

```text
src/
├── locales/                # Translation dictionary structures
│   ├── ar.json             # Arabic key-value language strings
│   └── en.json             # English key-value language strings
├── App.js                  # Core Dashboard layout engine & API lifecycle
├── App.css                 # Background gradient maps & utility selectors
├── i18n.js                 # Localized translation plugin configurations
└── index.js                # React runtime document rendering mount point
```

---

## 🛠️ Tech Stack & Key Libraries

* **Core Framework Engine**: React.js
* **Design & Layout Libraries**: Material UI (MUI v5)
* **Asynchronous API Client**: Axios
* **Time & Date Formatting**: Moment.js
* **Internationalization Engine**: i18next & react-i18next

---

## 🚀 Getting Started

Follow these short commands to execute the web project layout locally on your desktop machine:

### 1. Clone the repository
```bash
git clone https://github.com.git
cd YOUR_WEATHER_REPO_NAME
```

### 2. Install package dependencies
```bash
npm install
```

### 3. Launch the local development server
```bash
npm start
```
*Open [http://localhost:3000](http://localhost:3000) inside your web browser to check out your running interface dashboard!*

---

## 🎨 Layout Styling & Presentation

* **Typography Mapping**: Premium `IBM Plex Sans` type scale configurations.
* **Frosted Layer Background**: Smooth dark translucent palettes (`rgba(15, 32, 67, 0.65)`) with an overlaid `blur(10px)` filter.
* **Weather Pic Alignment**: Circular `50%` radius background border masks complete with soft accent dropshadow configurations to give elements an elegant modern floating effect.

---

## 📄 License

This project is open-source and available under the **MIT License**. Feel free to copy, modify, and build upon it!
