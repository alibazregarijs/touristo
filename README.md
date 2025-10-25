# 🌍 Travel Booking App

A full‑stack booking and trip‑planning application built with **Next.js**, **React**, **Convex**, and **Material‑UI**.  
It supports **authentication**, **internationalization**, **real‑time data**, and is fully tested with **Jest + React Testing Library**.  
CI/CD pipelines ensure smooth deployments and reliable delivery.

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

🔄 CI/CD
GitHub Actions pipeline runs:

Linting & type checks

Jest test suite

Build & deploy (to Vercel/Netlify or your chosen host)

🌍 Internationalization
Uses next-intl for locale‑based routing (/en, /fa, etc.)

Middleware ensures correct locale detection

Translations stored in messages/ directory

📸 Screenshots
<img src="./public/ProductImage/dashboard.png" alt="Dashboard Flow" width="600"/>
<img src="./public/ProductImage/trip.png" alt="Booking Flow" width="600"/>
```

🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📜 License
MIT License © 2025 [alibazregarijs](https://github.com/alibazregarijs)
