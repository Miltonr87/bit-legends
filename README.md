# Bit Legends

**Bit Legends** is a retro gaming portal that revives the golden age of arcade and console classics. Built for nostalgia lovers, it lets players relive timeless games like _Streets of Rage 2_ directly in their browser.

---

## 🎮 Overview

Bit Legends provides a seamless emulation experience using embedded game ROMs and a modern front-end stack. It’s fully responsive, optimized for both desktop and mobile devices, and designed to capture the authentic feel of classic gaming.

---

## 🚀 Features

- 🎮 Play retro games directly in the browser (via EmulatorJS)
- 🕹️ Integrated virtual controller with keyboard mapping
- 🧠 Game history and favorites stored locally
- 🌙 Dark Mode and responsive layout
- 📱 Mobile-friendly interface with auto-detection
- 🏆 Player stats and star rating system
- 🔗 Social sharing and community integration

---

## 🧩 Technologies Used

| Category           | Technologies                                         |
| ------------------ | ---------------------------------------------------- |
| **Frontend**       | React 18, TypeScript, Vite                           |
| **UI & Styling**   | Tailwind CSS, Shadcn/UI, Framer Motion, Lucide Icons |
| **State & Data**   | React Query, Local Storage API                       |
| **Backend / Auth** | Supabase (Auth, Database, Storage)                   |
| **Emulation**      | EmulatorJS (via CDN)                                 |
| **Hosting**        | Vercel                                               |

---

## 🧠 Architecture

Bit Legends is structured as a modern single-page application (SPA) using Vite for bundling and fast development. EmulatorJS is integrated dynamically via CDN, allowing flexible loading of multiple ROM sources while maintaining strong performance.

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bit-legends.git
cd bit-legends

# Install dependencies
yarn install

# Run locally
yarn dev

# Build for production
yarn build
```

Then open `http://localhost:5173` in your browser.

---

## 🕹️ Controls

Default keyboard mapping:

| Action | Key         |
| ------ | ----------- |
| Up     | ↑           |
| Down   | ↓           |
| Left   | ←           |
| Right  | →           |
| A      | Z           |
| B      | X           |
| X      | A           |
| Y      | S           |
| L      | Q           |
| R      | E           |
| Start  | Enter       |
| Select | Right Shift |

---

## 🧑‍💻 Author

**Milton Rodrigues**  
Front-End Developer  
🌐 [bitlegends.vercel.app](https://bitlegends.vercel.app)

---

## 📜 License

This project is licensed under the MIT License.  
Copyright (c) 2025 Milton Rodrigues.
