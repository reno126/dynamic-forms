<div align="center">

# Dynamic Forms

### Design a form. Collect entries. Keep your data in your browser.

An interactive frontend demo for building custom forms and managing their submissions, with a responsive dashboard and browser-based persistence.

[**Open the live demo →**](https://dynamic-forms-eta.vercel.app/)

<br />

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss)
![Tests](https://img.shields.io/badge/tests-Jest_%2B_Playwright-99425b?logo=jest)

</div>

---

## 💡 Motivation?

Dynamic Forms is a demo app for exploring IndexedDB in a practical frontend workflow: define forms, save records, and revisit them after a refresh. Dexie.js keeps browser database operations approachable, while the UI stays focused on creating, reading, updating, and deleting local data. The app is intentionally small so the IndexedDB persistence model is easy to follow.

## ✨ What you can do

| Build | Collect | Manage |
| --- | --- | --- |
| Create forms with text, number, date, checkbox, and select fields. | Add records through forms generated from your definitions. | Browse records by form, edit entries, and remove forms or data. |
| Mark fields as required and configure single or multiple select options. | Keep records available after refreshing the page. | View form and record totals from the dashboard. |

### A quick tour

1. Open **My Forms** and create a form.
2. Add fields, choose their types, and configure any select options.
3. Open **My Lists** to add and manage records for that form.
4. Return to the dashboard to see the number of forms and records.

> **Demo data is stored locally.** The app uses IndexedDB in your current browser. Data does not sync to an account or across devices, and clearing browser storage removes it. The Management page can delete all app data from this browser.

## 🧰 Built with

- **Next.js App Router** and **React** for the application and routes
- **TypeScript** for typed form definitions and record data
- **Tailwind CSS** and locally owned **shadcn/ui** components for the interface
- **React Hook Form** for form state and dynamic fields
- **Dexie.js** for browser IndexedDB storage
- **Jest**, **React Testing Library**, and **Playwright** for unit, component, and browser tests

## 🚀 Run it locally

You’ll need Node.js and npm installed.

```bash
git clone https://github.com/reno126/dynamic-forms.git
cd dynamic-forms
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 🧪 Checks

```bash
npm run test          # Jest unit and component tests
npm run test:e2e      # Playwright browser tests
npm run test:ci       # Run both suites in sequence
npm run build         # Create a production build
```

Playwright uses desktop Chrome. Install its browser once if needed:

```bash
npx playwright install chromium
```

## 🧩 Frontend notes

- Form definitions and submitted records live in IndexedDB, so the demo needs no backend service or account system.
- The UI components in `src/lib/ui/` are part of this repository and can be adapted directly.
- Dynamic field rendering keeps the same form definition usable for both record entry and editing.
- The project includes focused component tests as well as end-to-end flows for browser persistence.

---

<div align="center">

Made as a frontend demo with Next.js, React, and TypeScript.

</div>
