# 🧮 Mathsperia - Interactive 2D Geometry Playground

**Mathsperia** is a dark-themed, interactive mathematics website that makes geometry learning visual, intuitive, and engaging. Built with SvelteKit 5, TypeScript, and Tailwind CSS, it provides real-time calculations and beautiful visualizations for 2D geometric shapes.

## ✨ Features

### 🎯 Core Features

- **9 Interactive Shape Calculators**
  - Circle, Rectangle, Square, Triangle, Trapezoid, Parallelogram, Ellipse, Rhombus, Kite
  - Real-time area and perimeter calculations
  - Interactive SVG visualizations with neon glow effects

- **Mathematical Formula Display**
  - Beautiful formula rendering using KaTeX
  - Shows both formula templates and calculated values

- **Dark Mode Design**
  - Always-on dark theme optimized for comfortable viewing
  - Neon accent colors (blue, cyan, violet)
  - Smooth animations and transitions

- **Multi-Phase Architecture**
  - Organized by feature phases (2D Geometry, 3D coming soon)
  - Easy to extend with new mathematical tools
  - Clean separation of concerns

### 🎨 Design Highlights

- **Color Palette**: Deep dark backgrounds (#0e0e10, #1a1a1d)
- **Accent Colors**: Blue (#3b82f6), Cyan (#06b6d4), Violet (#8b5cf6)
- **Responsive**: Mobile-friendly, touch-optimized controls
- **Accessibility**: High contrast, keyboard navigation support

## 🏗️ Technology Stack

- **Frontend**: SvelteKit 5 + TypeScript
- **Styling**: Tailwind CSS 4
- **Math Rendering**: KaTeX
- **Deployment**: Docker + Node.js 20 Alpine
- **Utilities**: Smart number formatting, responsive SVG scaling

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mathsperia.git
cd mathsperia

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Development

```bash
# Run development server with hot reload
npm run dev

# Run type checking
npm run check

# Run linting
npm run lint

# Format code
npm run format

# Run tests
npm run test
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t mathsperia:latest .
```

### Run Container

```bash
docker run -p 3002:3002 mathsperia:latest
```

The application will be available at `http://localhost:3002`

### Docker Compose (Optional)

```yaml
version: '3.8'
services:
  mathsperia:
    build: .
    ports:
      - '3002:3002'
    environment:
      - NODE_ENV=production
      - PORT=3002
    restart: unless-stopped
```

## 📦 Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## ✨ Smart Features

### Intelligent Number Formatting

- Displays integers without decimals (e.g., `25` instead of `25.00`)
- Shows decimals only when needed (e.g., `25.5`, `3.14`)
- Removes trailing zeros for clean output

### Responsive SVG Scaling

- Automatically adjusts shape visualization based on input values
- Handles large numbers gracefully without overflow
- Maintains visual proportions and clarity

## 🗂️ Project Structure

```
mathsperia/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ShapeCard.svelte      # Homepage shape cards
│   │   │   └── FormulaDisplay.svelte # KaTeX formula renderer
│   │   └── utils/
│   │       ├── shapes.ts             # Math calculation functions
│   │       └── format.ts             # Number formatting utilities
│   ├── routes/
│   │   ├── +page.svelte              # Homepage (feature categories)
│   │   └── 2d/
│   │       ├── +page.svelte          # 2D Geometry index
│   │       ├── circle/+page.svelte   # Circle calculator
│   │       ├── rectangle/+page.svelte # Rectangle calculator
│   │       ├── square/+page.svelte   # Square calculator
│   │       ├── triangle/+page.svelte # Triangle calculator
│   │       ├── trapezoid/+page.svelte # Trapezoid calculator
│   │       ├── parallelogram/+page.svelte # Parallelogram calculator
│   │       └── ellipse/+page.svelte  # Ellipse calculator
│   ├── app.css                       # Global styles & dark theme
│   └── app.html                      # HTML template
├── Dockerfile                        # Docker build configuration
├── .dockerignore                     # Docker ignore patterns
└── svelte.config.js                  # SvelteKit configuration
```

## 🎯 Supported Shapes

| Shape             | Inputs                         | Calculated                    |
| ----------------- | ------------------------------ | ----------------------------- |
| **Circle**        | Radius                         | Area, Circumference           |
| **Rectangle**     | Length, Width                  | Area, Perimeter               |
| **Square**        | Side                           | Area, Perimeter               |
| **Triangle**      | See triangle types below       | Area, Perimeter               |
| **Trapezoid**     | Bases (a, b), Height           | Area, Perimeter (approx)      |
| **Parallelogram** | Base, Height, Side             | Area, Perimeter               |
| **Ellipse**       | Semi-major (a), Semi-minor (b) | Area, Perimeter (Ramanujan's) |
| **Rhombus**       | Diagonal 1, Diagonal 2         | Area, Perimeter               |
| **Kite**          | Diagonal 1, Diagonal 2         | Area, Perimeter (approx)      |

### 🔺 Triangle Types

Each triangle type has its own calculator with specific formulas:

| Type            | Description         | Inputs               | Special Features                   |
| --------------- | ------------------- | -------------------- | ---------------------------------- |
| **Equilateral** | All sides equal     | Side length          | All angles 60°                     |
| **Isosceles**   | Two sides equal     | Base, Equal side     | Auto-validates triangle inequality |
| **Right**       | 90° angle           | Base (a), Height (b) | Shows hypotenuse calculation       |
| **Scalene**     | All sides different | Side A, B, C         | Uses Heron's formula               |

## 🔧 Configuration

### Port Configuration

Default port is **3002** (Docker) and **5173** (dev). Change in:

- Docker: `Dockerfile` and `docker run -p` command
- Dev: `vite.config.ts`

### Adding New Features

To add a new phase (e.g., 3D Geometry):

1. Create new route directory: `src/routes/3d/`
2. Add calculators: `src/routes/3d/[shape]/+page.svelte`
3. Update homepage: Add link in `src/routes/+page.svelte`
4. Create utilities: Add calculation functions in `src/lib/utils/`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📮 Contact

- **Project**: Mathsperia
- **Domain**: mathsperia.web.id
- **Built with**: ❤️ for mathematics enthusiasts

---

**No login required • Open source**
