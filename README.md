# GetHyped - Social-First Content Agency

A pixel-perfect, high-performance landing page clone of **GetHyped**, built with modern web technologies. This project focuses on high-fidelity animations, responsive design, and smooth user interactions to mirror the premium aesthetic of the original agency website.

**Live Demo:** [https://get-hyped-blush.vercel.app/](https://get-hyped-blush.vercel.app/)

---

## 🚀 Features

- **Premium UI/UX:** Meticulously crafted layouts matching the original design parity.
- **Interactive Animations:**
  - **Hero Fan-out Animation:** Elastic card fan-out effect using Framer Motion.
  - **Expertise Stacking:** 3D folding and stacking card animation using GSAP ScrollTrigger.
  - **Selected Work Interactions:** Smooth hover effects with video transitions and interactive brand frames.
  - **Marquee Branding:** Draggable and auto-scrolling brand logo marquee.
  - **Drop Splash Menu:** A mobile-optimized full-screen navigation with a bouncy "drop splash" circle animation.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop devices with custom mobile-specific overrides.
- **Performance Optimized:** Fast loading times using Next.js 15+ features and optimized asset delivery.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** 
  - [GSAP](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/)
  - [Framer Motion](https://www.framer.com/motion/)
- **Icons:** Custom SVG & Lucide Icons
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JoyChanda/GetHyped.git
   ```

2. **Navigate to the client directory:**
   ```bash
   cd GetHyped/client
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the browser:**
   Go to [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📂 Project Structure

```text
client/
├── app/
│   ├── components/        # Reusable UI sections (Hero, Intro, Footer, etc.)
│   ├── globals.css        # Global styles and Tailwind directives
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Main landing page assembly
├── public/                # Static assets (Videos, Logos, Favicon)
└── package.json           # Project dependencies and scripts
```

---

## 📝 License

This project was built for educational and portfolio purposes as a technical assessment/clone. All original design rights belong to [GetHyped](https://gethyped.nl/).

---

**Built with ❤️ by [Joy Chanda](https://github.com/JoyChanda)**
