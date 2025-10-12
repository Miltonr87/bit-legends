# Bit Legends

**Bit Legends** is a retro gaming portal that revives the golden age of arcade and console classics. Built for nostalgia lovers, it lets players relive timeless games like _Streets of Rage 2_ directly in their browser.

---

## 🎮 Overview

Bit Legends provides a seamless emulation experience using embedded game ROMs and a modern front-end stack. It’s fully responsive, optimized for both desktop and mobile devices, and designed to capture the authentic feel of classic gaming.

---

## 🚀 Features

- 🎮 Play retro games directly in the browser (via EmulatorJS) and save state locally or on storage
- 🕹️ Integrated virtual controller with keyboard mapping
- 🧠 Game history and favorites stored in Firebase
- 📱 Mobile-friendly interface with auto-detection
- 💾 Cloud sync for favorite games and user profile
- 📊 **New:** Analytics dashboard powered by Simple Analytics API (Axios)
- 🔗 Social sharing and community integration

---

## 🧩 Technologies Used

| Category         | Technologies                                              |
| ---------------- | --------------------------------------------------------- |
| **Frontend**     | React 18, TypeScript, Vite                                |
| **UI & Styling** | Tailwind CSS, Shadcn/UI, Framer Motion, Lucide Icons      |
| **State & Data** | React Query, Local Storage API, Firebase Firestore        |
| **Auth**         | Firebase Auth (Google OAuth)                              |
| **Backend**      | Firebase (Auth, Firestore, Storage), Simple Analytics API |
| **Emulation**    | EmulatorJS (via CDN)                                      |
| **Hosting**      | Vercel                                                    |

---

## 🧠 Architecture

Bit Legends is a modern **Single-Page Application (SPA)** built with **Vite**.  
It integrates **Firebase Authentication** and **Cloud Firestore** for user data, favorites, and progress tracking.

Game content is dynamically loaded via EmulatorJS CDN, ensuring fast performance and flexibility.

The project now also includes a **serverless API route** that fetches pageview and country analytics using [Simple Analytics](https://simpleanalytics.com/), with an intelligent fallback to mock data when the service is unavailable.

---

## 📊 API Endpoints

### `/api/analytics`

Retrieves live traffic and country stats from Simple Analytics.

#### Example Response:

```json
{
  "pageviews": { "value": 4821 },
  "countries": {
    "Brazil": 1950,
    "United States": 1320,
    "Germany": 640,
    "Japan": 410
  }
}
```

If the external API call fails, mock data is returned automatically to keep the dashboard functional.

---

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

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Environment Setup

Create a `.env` file in the project root with the following example values:

```bash
# Google OAuth
VITE_GOOGLE_CLIENT_ID

# Firebase Configuration
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

> 💡 **Tip:** Never commit your `.env` file to GitHub.  
> In production (e.g. Vercel), define these variables via **Project → Settings → Environment Variables**.

---

## 🔧 Deployment (Vercel + Firebase)

1. Push your project to GitHub.
2. Connect the repo to **Vercel**.
3. Add all `.env` variables to **Vercel → Settings → Environment Variables**.
4. Redeploy your main branch.
5. In Firebase Console → Authentication → add:
   ```
   localhost
   ```
   to **Authorized Domains**.

That’s it — your deployment is live 🎮

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
