# Lexis Electronics Website

A premium, immersive web experience for Lexis Electronics, featuring cutting-edge 3D visuals, smooth animations, and a dynamic product catalog.

## ✨ Features

- **Immersive 3D Experiences**: Powered by Three.js and React Three Fiber for interactive product showcases and visual storytelling.
- **Fluid Animations**: Leveraging GSAP and Framer Motion for high-performance micro-interactions and page transitions.
- **Dynamic Product Catalog**: Advanced filtering, comparison, and quick view capabilities for a seamless shopping experience.
- **Premium Design System**: Tailored aesthetics with custom color palettes and responsive layouts using Tailwind CSS.
- **Performance Optimized**: Built on Vite for lightning-fast development and optimized production bundles.

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **3D & Canvas**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP, Framer Motion
- **Styling**: Tailwind CSS, PostCSS
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Radheshbhuva/Lexis_Electronics.git
   cd Lexis_Electronics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified by Vite).

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```text
├── src/
│   ├── components/       # Reusable components (Fiber, Preloader, Nav, etc.)
│   │   ├── common/       # Common elements (WhatsApp Button, etc.)
│   │   └── sections/     # Page sections (Showcase, Story, Trust, etc.)
│   ├── pages/            # Page components (Home, Products, Gallery)
│   ├── data/             # Static data (Products data)
│   ├── index.css         # Global styles and Tailwind directives
│   └── main.jsx          # Application entry point
├── public/               # Static assets (images, models, etc.)
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---
Built with ❤️ by [Radhesh Bhuva](https://github.com/Radheshbhuva)