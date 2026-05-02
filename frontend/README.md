# 🖥️ ExecuStra: Frontend Architecture

This directory contains the user interface and client-side logic for the **ExecuStra Adaptive Life OS**. Designed with the "Midnight Glass" aesthetic, this frontend delivers a premium, highly responsive, and distraction-free experience optimized for elite cognitive performance.

---

## 💎 Design Philosophy: Midnight Glass
The UI is engineered to minimize cognitive load while maximizing focus. We utilize a dark, obsidian-based color palette coupled with subtle glassmorphism effects (`backdrop-blur`) and vibrant accent colors (emerald, neon blue, and warnings) to guide the user's attention.

---

## 🛠️ Tech Stack & Tooling
*   **Core Framework**: React 19 + Vite (for ultra-fast HMR and optimized builds)
*   **Styling Engine**: TailwindCSS
*   **Animations**: Framer Motion (for fluid micro-interactions and the Execution Progress Ring)
*   **Icons**: Lucide React (clean, consistent vector icons)
*   **Routing**: React Router DOM
*   **State Management**: React Context API (`TaskContext`, `AuthContext`)

---

## 📂 Structure Overview
*   `src/components/`: Reusable UI elements (Buttons, Layouts, Navigation).
*   `src/pages/`: Main route views (Dashboard, Focus, Reflection, Profile, Onboarding).
*   `src/context/`: Global state providers handling authentication and task generation logic.
*   `src/index.css`: Global design tokens, CSS variables, and custom Tailwind utility layers.

---

## 🚀 Local Development Setup

### Prerequisites
Ensure you have **Node.js** (v18+) installed on your machine.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
This will launch the Vite development server, typically accessible at `http://localhost:5173`.

### 3. Build for Production
To create an optimized production build (which will be served by the FastAPI backend in the unified deployment):
```bash
npm run build
```
The compiled assets will be generated in the `dist/` directory.

---

*For backend and system-wide documentation, refer to the [Main Project README](../README.md).*
