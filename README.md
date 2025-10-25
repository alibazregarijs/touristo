# 🌍 Travel Booking App

A full‑stack booking and trip‑planning application built with **Next.js**, **React**, **Convex**, and **Material‑UI**.  
It supports **authentication**, **internationalization**, **real‑time data**, and is fully tested with **Jest + React Testing Library**.  
CI/CD pipelines ensure smooth deployments and reliable delivery.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Auth.js](https://img.shields.io/badge/Auth.js-Authentication-blue)
![Convex](https://img.shields.io/badge/Convex-Realtime%20Backend-orange)
![i18n](https://img.shields.io/badge/i18n-Multi--language-green)
![MUI](https://img.shields.io/badge/MUI-UI%20Library-007FFF?logo=mui)
![Husky](https://img.shields.io/badge/Husky-Git%20Hooks-lightgrey?logo=git)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest)
![RTL](https://img.shields.io/badge/React%20Testing%20Library-UI%20Tests-E33332?logo=testinglibrary)

---

## ✨ Features

- 🔐 **Authentication** with [Auth.js](https://authjs.dev/) (secure login & session handling)
- 🌐 **Internationalization (i18n)** with `next-intl` for multi‑language support
- 📊 **Real‑time backend** powered by [Convex](https://convex.dev/) for live updates
- 🎨 **Material‑UI (MUI)** for a responsive, accessible, and modern UI
- 🧪 **Testing** with Jest + React Testing Library (RTL) for resilient, user‑centric tests
- ⚡ **Next.js App Router** with Server Components, Suspense, and streaming
- 🚀 **CI/CD pipeline** for automated testing, building, and deployment
- 📱 **Responsive design** optimized for desktop and mobile

---

## 🛠️ Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Frontend     | Next.js (App Router), React, TypeScript |
| Styling/UI   | Material‑UI (MUI)                       |
| Backend / DB | Convex (serverless, real‑time)          |
| Auth         | Auth.js                                 |
| i18n         | next-intl                               |
| Testing      | Jest, React Testing Library             |
| DevOps       | GitHub Actions (CI/CD)                  |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/alibazregarijs/touristo
cd touristo
npm install
# or
yarn install

AUTH_SECRET=your_auth_secret
CONVEX_DEPLOYMENT=your_convex_url
NEXT_PUBLIC_CONVEX_URL=your_convex_url

npm run dev
```

## 🔄 CI/CD
GitHub Actions pipeline runs:

Linting & type checks

Jest test suite

Build & deploy (to Vercel/Netlify or your chosen host)

## 🌍 Internationalization
Uses next-intl for locale‑based routing (/en, /fa, etc.)

Middleware ensures correct locale detection

Translations stored in messages/ directory

## 🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📜 License
MIT License © 2025 [alibazregarijs](https://github.com/alibazregarijs)
