# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




# NASA API Explorer 🚀

A React web application that showcases NASA's Open APIs with interactive data visualization, built with modern React practices and Material-UI.

![APOD Screenshot](screenshot.png) *(Replace with your actual screenshot)*

## Features ✨
- **Astronomy Picture of the Day (APOD)** with date navigation
- **Near Earth Objects (NEO) tracker**
- **Mars Rover photos explorer**
- Responsive design with mobile-first approach
- Error handling and loading states
- Custom theme with dark/light mode support



/src
├── /assets # Static assets and global styles
│ └── /style # Theme configuration
├── /components # Reusable UI components
│ ├── /common # Shared components (Header, Footer)
│ └── /apod # APOD-specific components
├── /pages # Route-level components
│ ├── Home.jsx # Landing page
│ ├── APODPage.jsx # Astronomy Picture of the Day
│ ├── NeoPage.jsx # Near Earth Objects
│ └── MarsPage.jsx # Mars Rover Photos
├── /services # API service layer
│ └── nasaAPI.js # NASA API service functions
└── App.js # Main application router





## React Best Practices Implemented ✅

### 1. Component Architecture
- **Smart/Dumb component separation**: Container components handle logic, presentational components handle UI
- **Reusable components**: Button, Card, and Chip components standardized
- **Custom hooks**: Abstracted data fetching logic (could be extended to custom hooks)

### 2. State Management
- Local state management with `useState` and `useEffect`
- Context API for theme management (via Material-UI)
- Error and loading states handled gracefully

### 3. Performance Optimizations
- Memoization: Components memoized where appropriate
- Lazy loading: Route-based code splitting (recommended addition)
- Efficient re-renders: Dependency arrays properly specified

### 4. UI/UX Considerations
- Responsive design with Material-UI breakpoints
- Loading skeletons and progress indicators
- Accessible form controls and ARIA labels
- Mobile-friendly touch targets

## Key Technical Decisions 🧠

1. **Material-UI**: Chosen for:
   - Consistent design system
   - Responsive utilities
   - Theming capabilities
   - Accessibility out-of-the-box

2. **Axios**: For API requests with:
   - Request/response interceptors
   - Error handling standardization
   - Promise-based async flow

3. **Date-fns**: Modern date utility library for:
   - Lightweight date manipulations
   - Immutable operations
   - Clean date formatting

## Setup Instructions ⚙️

1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/nasa-api-explorer.git




  2 Install dependencies:

   npm install

   3 create env
   VITE_API_BASE_URL=your_backend_url/
VITE_NASA_API_KEY=your_nasa_api_key



npm run dev


