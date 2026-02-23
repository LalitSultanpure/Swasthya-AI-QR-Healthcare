# Swasthya AI - Frontend

A modern React + TypeScript + Tailwind CSS frontend application for the Swasthya AI healthcare platform.

## 📋 Project Structure

```
swasthya.ai/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Button.tsx       # Button component
│   │   ├── Header.tsx       # Header component
│   │   └── Footer.tsx       # Footer component
│   ├── pages/               # Page components
│   │   └── Home.tsx         # Home page
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   └── useFetch.ts
│   ├── utils/               # Utility functions
│   │   └── helpers.ts
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Type definitions
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── .eslintrc.cjs            # ESLint configuration
└── .gitignore               # Git ignore rules
```

## 🚀 Installation & Setup

### Step 1: Install Node.js
If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org)

### Step 2: Navigate to project directory
```bash
cd "C:\Users\LENOVO\OneDrive\Desktop\swasthya.ai"
```

### Step 3: Install dependencies
```bash
npm install
```

## 🛠 Available Commands

### Development Server
Start the development server with hot module replacement:
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### Build for Production
Create an optimized production build:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

### Run ESLint
Check code quality:
```bash
npm run lint
```

### Type Check
Check TypeScript types without emitting:
```bash
npm run type-check
```

## 📦 Dependencies

### Production
- **react**: ^18.2.0 - JavaScript UI library
- **react-dom**: ^18.2.0 - React rendering for web
- **react-router-dom**: ^6.22.0 - Client-side routing
- **axios**: ^1.7.0 - HTTP client

### Development
- **vite**: ^5.2.0 - Frontend build tool
- **typescript**: ^5.2.2 - Type safety
- **tailwindcss**: ^3.4.1 - Utility-first CSS
- **eslint**: ^8.57.0 - Code linting

## 🎨 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **API**: Axios
- **Linting**: ESLint

## 📝 Component Documentation

### Button Component
Reusable button component with customizable styling.

```tsx
import { Button } from './components/Button'

<Button onClick={() => console.log('clicked')}>Click Me</Button>
```

### Header Component
Navigation header with branding.

```tsx
import { Header } from './components/Header'

<Header />
```

### Footer Component
Footer with links and information.

```tsx
import { Footer } from './components/Footer'

<Footer />
```

## 🎣 Custom Hooks

### useLocalStorage
Persist state to local storage.

```tsx
const [value, setValue] = useLocalStorage('key', initialValue)
```

### useFetch
Fetch data from API endpoints.

```tsx
const { data, loading, error, refetch } = useFetch('/api/endpoint')
```

## 🧰 Utility Functions

- `formatDate(date)` - Format dates to readable strings
- `validateEmail(email)` - Validate email addresses
- `capitalize(str)` - Capitalize first letter
- `debounce(func, delay)` - Debounce function calls

## 📖 Getting Started

1. Install Node.js (if not already installed)
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Open browser to `http://localhost:3000`
5. Start developing! Files auto-reload on save

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for environment-specific variables:
```
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Swasthya AI
```

Then access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run `npm run lint` to check code quality
4. Commit and push your changes
5. Create a pull request

## 📄 License

This project is part of the Swasthya AI platform.

## 📞 Support

For issues or questions, please contact the development team.
