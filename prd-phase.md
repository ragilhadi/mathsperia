# Mathsperia – Phase 1 Product Requirements Document (PRD)

## 🧮 Overview

### Project Description

**Mathsperia** is an interactive dark-themed mathematics website designed to make geometry and math learning visual, intuitive, and engaging. Phase 1 delivers the **2D Geometry Playground**, allowing users to explore and calculate properties of shapes visually using SVG interactivity.

### Key Characteristics

- **No Authentication Required**: The app runs entirely client-side
- **Anonymous Analytics**: Optional usage tracking without user identification
- **Modern Tech Stack**: Built using SvelteKit 5 + TypeScript
- **Responsive Design**: Styled with Tailwind CSS
- **Containerized Deployment**: Fully Dockerized for easy deployment

---

## 🎯 Objectives

### Primary Goals

- **Build a dark-mode-only interactive geometry calculator**
  - No light mode toggle required
  - Consistent dark theme throughout the application

- **Enable visual shape manipulation**
  - Users can input or manipulate shapes visually via SVG
  - Real-time interactive feedback

- **Instant calculations and formulas**
  - Show area, perimeter, and formula instantly
  - Display mathematical formulas using KaTeX

- **Anonymous usage tracking**
  - Collect anonymous usage statistics (no login required)
  - Privacy-focused analytics implementation

- **Containerized deployment**
  - Package and deploy the app with Docker
  - Default port: **3002**

---

## 🏗️ Technology Stack

### Frontend Layer

- **Framework**: SvelteKit 5 + TypeScript
  - Purpose: Application logic and UI components
  - Benefits: Type safety, reactive updates, modern development experience

- **Styling**: Tailwind CSS (Dark Mode)
  - Purpose: Consistent dark theme styling
  - Benefits: Utility-first CSS, rapid development, small bundle size

### Backend & Logic

- **Math Engine**: Custom TypeScript functions
  - Purpose: Shape formulas and calculations
  - Note: No external math libraries (no math.js dependency)
  - Implementation: Pure TypeScript calculation functions

- **Analytics**: Lightweight API route
  - Purpose: Record anonymous usage events
  - Endpoint: `/api/track`
  - Storage: SQLite or JSON file

### Deployment & Infrastructure

- **Containerization**: Docker (Node 20-alpine)
  - Purpose: Portable, reproducible builds
  - Base image: `node:20-alpine` for minimal footprint

- **Hosting Options**:
  - Vercel (recommended for SvelteKit)
  - VPS with Docker
  - Any Docker-compatible host

- **Domain**: `mathsperia.web.id`
  - Production URL for public access

---
## 🧩 Core Features (Phase 1)

### 1. Homepage

- **Geometry Shape Grid**
  - Display cards for all available 2D shapes
  - Each card shows:
    - Shape name (e.g., "Circle", "Triangle", "Rectangle")
    - SVG preview of the shape
    - Brief description
    - Hover effects with neon glow
  - Click to navigate to shape calculator

### 2. Interactive Shape Calculators

Each shape has its own dedicated calculator page with:

- **Visual SVG Canvas**
  - Interactive shape rendering
  - Real-time visual updates as inputs change
  - Draggable control points (where applicable)
  - Neon line accents for visual appeal

- **Input Controls**
  - Number inputs for shape dimensions
  - Validation for positive numbers
  - Unit selector (optional: cm, m, inches)
  - Clear/reset functionality

- **Calculation Results**
  - **Area**: Calculated and displayed with units
  - **Perimeter/Circumference**: Calculated and displayed
  - **Animated Result Display**: Smooth transitions when values update
  - Color-coded results (accent colors)

- **Formula Display**
  - Mathematical formulas rendered using **KaTeX**
  - Show both the formula template and calculated values
  - Examples:
    - Circle: `A = πr²`
    - Rectangle: `A = l × w`
    - Triangle: `A = ½ × b × h`

### 3. Supported Shapes (Phase 1)

- **Circle**
  - Input: radius
  - Outputs: area, circumference

- **Rectangle**
  - Inputs: length, width
  - Outputs: area, perimeter

- **Square**
  - Input: side length
  - Outputs: area, perimeter

- **Triangle**
  - Inputs: base, height
  - Outputs: area, perimeter (if all sides provided)

- **Trapezoid**
  - Inputs: parallel sides (a, b), height
  - Outputs: area, perimeter

- **Parallelogram**
  - Inputs: base, height, side
  - Outputs: area, perimeter

- **Ellipse**
  - Inputs: semi-major axis (a), semi-minor axis (b)
  - Outputs: area, approximate perimeter

### 4. User Experience Features

- **Responsive Design**
  - Mobile-friendly layout
  - Touch-friendly controls
  - Adaptive SVG sizing

- **Smooth Animations**
  - Page transitions
  - Result updates with fade-in effects
  - Hover states with glowing borders

- **Accessibility**
  - Keyboard navigation support
  - ARIA labels for screen readers
  - High contrast dark theme

---

## 🎨 Dark Mode Design

### Design Philosophy

- **Always Dark**: No light-mode toggle required
- **Consistent Theme**: Dark mode across all pages and components
- **Visual Hierarchy**: Use color accents to guide user attention

### Color Palette

#### Base Colors

- **Background**: `#0e0e10`
  - Deep dark background for main canvas
  - Reduces eye strain in low-light environments

- **Card/Surface**: `#1a1a1d`
  - Slightly lighter than background
  - Used for cards, modals, and elevated surfaces

- **Text**: `#e5e7eb`
  - Light gray for optimal readability
  - High contrast against dark background

#### Accent Colors

- **Blue**: `#3b82f6`
  - Primary action buttons
  - Links and interactive elements

- **Cyan**: `#06b6d4`
  - Secondary highlights
  - Info messages and tooltips

- **Violet**: `#8b5cf6`
  - Tertiary accents
  - Special features and premium elements

### Visual Effects

- **Neon Line Accents on SVGs**
  - Glowing borders on shapes
  - Animated stroke effects
  - Color transitions on hover

- **Smooth Transitions**
  - `transition-all duration-300 ease-in-out`
  - Applied to interactive elements
  - Consistent animation timing

- **Hover Glows**
  - Box shadow with accent colors
  - Subtle scale transforms (1.02x - 1.05x)
  - Brightness increase on hover

### Typography

- **Font Family**: System fonts or modern sans-serif (e.g., Inter, Poppins)
- **Headings**: Bold, larger sizes with accent colors
- **Body Text**: Regular weight, `#e5e7eb` color
- **Code/Formulas**: Monospace font for mathematical expressions

---

## 📊 Analytics Tracking

### Overview

Anonymous, privacy-focused usage analytics to understand user behavior without collecting personal information.

### Implementation Details

#### Session Management

- **Session ID Generation**
  - Generate unique anonymous ID on first visit
  - Store in browser's `localStorage`
  - Format: UUID v4 or random hash
  - No personal information collected

#### Event Tracking

- **API Endpoint**: `/api/track`
- **Method**: POST
- **Payload Structure**:
  ```json
  {
    "sessionId": "uuid-string",
    "shape": "circle",
    "action": "calculate",
    "timestamp": "2024-01-15T10:30:00Z",
    "metadata": {
      "inputValues": ["radius: 5"],
      "resultArea": 78.54,
      "resultPerimeter": 31.42
    }
  }
  ```

#### Tracked Events

- **Shape View**: User opens a shape calculator
- **Calculate**: User performs a calculation
- **Input Change**: User modifies input values
- **Reset**: User resets the calculator
- **Page View**: Homepage or shape page visited

#### Data Storage

- **Storage Options**:
  - **SQLite**: Lightweight file-based database (recommended for VPS)
  - **JSON File**: Simple append-only log (for minimal setups)
  - **PostgreSQL**: For production scale (future consideration)

- **Data Retention**:
  - Store events for analysis
  - Daily aggregation for shape popularity
  - Optional: Auto-cleanup after 90 days

#### Analytics Dashboard (Future)

- Total calculations per shape
- Most popular shapes
- Daily/weekly/monthly usage trends
- Average session duration

### Privacy Considerations

- ✅ No user authentication required
- ✅ No IP address logging
- ✅ No personal identifiable information (PII)
- ✅ Anonymous session IDs only
- ✅ No third-party analytics (e.g., Google Analytics)
- ✅ GDPR-friendly approach

---

## 📁 Folder Structure

```
mathsperia/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ShapeCard.svelte
│   │   │   ├── Calculator.svelte
│   │   │   ├── FormulaDisplay.svelte
│   │   │   ├── SVGCanvas.svelte
│   │   │   └── ResultPanel.svelte
│   │   ├── utils/
│   │   │   ├── calculations.ts
│   │   │   ├── analytics.ts
│   │   │   └── validators.ts
│   │   └── types/
│   │       └── shapes.ts
│   ├── routes/
│   │   ├── +page.svelte              # Homepage
│   │   ├── +layout.svelte            # Root layout
│   │   ├── api/
│   │   │   └── track/
│   │   │       └── +server.ts        # Analytics endpoint
│   │   └── shapes/
│   │       ├── circle/
│   │       │   └── +page.svelte
│   │       ├── rectangle/
│   │       │   └── +page.svelte
│   │       ├── triangle/
│   │       │   └── +page.svelte
│   │       ├── square/
│   │       │   └── +page.svelte
│   │       ├── trapezoid/
│   │       │   └── +page.svelte
│   │       ├── parallelogram/
│   │       │   └── +page.svelte
│   │       └── ellipse/
│   │           └── +page.svelte
│   ├── app.html
│   └── app.css
├── static/
│   ├── favicon.ico
│   └── robots.txt
├── data/                              # Analytics data storage
│   └── analytics.db                   # SQLite database
├── Dockerfile
├── docker-compose.yml
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

### Key Directories

- **`src/lib/components/`**: Reusable Svelte components
- **`src/lib/utils/`**: Utility functions for calculations and analytics
- **`src/routes/`**: SvelteKit file-based routing
- **`src/routes/api/`**: API endpoints for server-side logic
- **`src/routes/shapes/`**: Individual shape calculator pages
- **`static/`**: Static assets (favicon, images, etc.)
- **`data/`**: Analytics database storage (mounted as Docker volume)

---

## 🐳 Dockerization

### Overview

The application is fully containerized using Docker for consistent deployment across different environments.

### Dockerfile

Multi-stage build for optimized image size and security:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app

# Copy built files and install production dependencies only
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm install --omit=dev

# Expose port and set environment
EXPOSE 3002
ENV PORT=3002

# Start the application
CMD ["node", "./build/index.js"]
```

#### Dockerfile Features

- **Multi-stage Build**: Separates build and runtime environments
- **Alpine Base**: Minimal image size (~50MB compressed)
- **Production Dependencies Only**: Excludes dev dependencies in final image
- **Port 3002**: Default application port
- **Node 20**: Latest LTS version for stability

### Docker Compose

Simplified orchestration for local development and deployment:

```yaml
version: "3.8"

services:
  mathsperia:
    build: .
    container_name: mathsperia_app
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - PORT=3002
    volumes:
      - ./data:/app/data    # Persist analytics data
    restart: unless-stopped
```

#### Docker Compose Features

- **Automatic Restart**: Container restarts on failure
- **Volume Mounting**: Persist analytics database outside container
- **Environment Variables**: Configure runtime settings
- **Port Mapping**: Expose port 3002 to host

### Build & Run Commands

#### Build the Docker Image

```bash
docker build -t mathsperia:latest .
```

#### Run with Docker

```bash
docker run -d \
  --name mathsperia \
  -p 3002:3002 \
  -v $(pwd)/data:/app/data \
  mathsperia:latest
```

#### Run with Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Deployment Considerations

- **Data Persistence**: Mount `./data` volume to preserve analytics
- **Environment Variables**: Configure via `.env` file or compose environment
- **Health Checks**: Add health check endpoint for production monitoring
- **Resource Limits**: Set memory/CPU limits in production

---

## 🚀 Deliverables

### Phase 1 Completion Checklist

#### Frontend Components

- ✅ **Dark-mode Homepage**
  - Grid layout of 2D geometry shape cards
  - Responsive design for mobile and desktop
  - Hover effects with neon glows

- ✅ **Interactive Shape Calculators**
  - Individual pages for each shape (7 shapes total)
  - SVG-based visual representations
  - Real-time input validation
  - Animated result displays

#### Core Functionality

- ✅ **Custom Math Formulas in TypeScript**
  - Pure TypeScript calculation functions
  - No external math library dependencies
  - Unit-tested calculation accuracy

- ✅ **Formula Display System**
  - KaTeX integration for mathematical notation
  - Display both formula templates and calculated values
  - Responsive formula rendering

#### Backend & Analytics

- ✅ **Anonymous Analytics API**
  - `/api/track` endpoint implementation
  - Session ID management in localStorage
  - SQLite/JSON data storage
  - Privacy-compliant tracking

#### Deployment

- ✅ **Dockerized Application**
  - Multi-stage Dockerfile
  - Docker Compose configuration
  - Port 3002 exposed
  - Volume mounting for data persistence

- ✅ **Production Deployment**
  - Deployed at `mathsperia.web.id`
  - SSL/TLS certificate configured
  - Domain DNS configured
  - Application accessible publicly

### Acceptance Criteria

- [ ] All 7 shape calculators are functional
- [ ] Calculations are mathematically accurate
- [ ] Dark theme is consistent across all pages
- [ ] Analytics tracking is working without errors
- [ ] Docker container builds and runs successfully
- [ ] Application is accessible at production URL
- [ ] Mobile responsive design works on common devices
- [ ] Page load time < 3 seconds
- [ ] No console errors in browser

---

## 🧭 Phase 2 Preview

### Planned Features

#### 1. 3D Geometry Playground

- **Interactive 3D Shapes**
  - Sphere, cube, cylinder, cone, pyramid
  - WebGL or Three.js rendering
  - Rotate and zoom controls
  - Volume and surface area calculations

- **Visual Enhancements**
  - Real-time 3D manipulation
  - Lighting and shadow effects
  - Multiple viewing angles

#### 2. Algebra Solver

- **Equation Solver**
  - Linear equations (ax + b = c)
  - Quadratic equations (ax² + bx + c = 0)
  - System of equations (2x2, 3x3)
  - Step-by-step solution display

- **Expression Simplification**
  - Polynomial simplification
  - Fraction operations
  - Factorization

#### 3. Admin Dashboard for Analytics

- **Analytics Visualization**
  - Charts for shape popularity
  - Daily/weekly/monthly usage trends
  - User session statistics
  - Geographic distribution (if available)

- **Data Management**
  - Export analytics data (CSV/JSON)
  - Filter by date range
  - Real-time metrics

#### 4. Export Functionality

- **Image Export**
  - Export SVG shapes as PNG/SVG
  - Include calculations in exported image
  - Custom resolution options

- **PDF Export**
  - Generate PDF with shape, formula, and calculations
  - Print-friendly format
  - Include branding

### Phase 2 Timeline

- **Estimated Start**: After Phase 1 completion and user feedback
- **Duration**: 6-8 weeks
- **Priority**: Based on user demand and analytics insights

---

## 📝 Notes & Considerations

### Technical Debt

- Consider adding unit tests for calculation functions
- Implement error boundary components for better error handling
- Add loading states for async operations

### Performance Optimization

- Lazy load shape calculator pages
- Optimize SVG rendering for complex shapes
- Implement service worker for offline support (future)

### Accessibility Improvements

- Add keyboard shortcuts for common actions
- Improve screen reader support
- Ensure WCAG 2.1 AA compliance

### Future Enhancements

- Multi-language support (i18n)
- User accounts (optional, for saving calculations)
- Share calculation results via URL
- Dark/light mode toggle (if user demand exists)
- Mobile app (React Native or Flutter)

---

## 📞 Contact & Support

- **Domain**: [mathsperia.web.id](https://mathsperia.web.id)
- **Repository**: GitHub (TBD)
- **Issues**: GitHub Issues for bug reports
- **Documentation**: README.md and inline code comments

---

**Document Version**: 1.0  
**Last Updated**: 2024-01-15  
**Status**: Phase 1 - In Development