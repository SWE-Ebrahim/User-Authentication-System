# AuthProject Frontend

A modern, responsive frontend application built with React and Vite for the AuthProject authentication system. This frontend provides a complete user interface for all authentication flows including registration, login, email verification, and password reset.

## Description

AuthProject Frontend is a sleek and user-friendly interface designed to work seamlessly with the AuthProject backend authentication system. Built with React 18 and Vite, it offers fast loading times, smooth navigation, and a responsive design that works across all device sizes.

The application implements all standard authentication flows with proper form validation, error handling, and user feedback. It uses Redux Toolkit for state management and React Router for navigation, providing a seamless user experience.

## Features

- User Registration with Form Validation
- Email Verification Workflow
- Secure Login/Logout System
- Password Recovery and Reset
- Responsive Design for All Devices
- Form Validation with Zod and React Hook Form
- State Management with Redux Toolkit
- Route Protection for Authenticated Pages
- Modern UI Components with Tailwind CSS
- Smooth Animations with Framer Motion
- REST API Integration with Axios
- Environment-based Configuration
- Component-based Architecture

## Tech Stack

- **React 18** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **React Router v7** - Declarative routing for React
- **Redux Toolkit** - State management solution
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **React Hook Form** - Performant, flexible forms with easy validation
- **Zod** - TypeScript-first schema declaration and validation
- **Axios** - Promise based HTTP client
- **Lucide React** - Beautiful & consistent icon toolkit

## Installation Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

| Variable | Description | Example |
|---------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api/v1` |
| `VITE_APP_NAME` | Application name | `Auth Project` |

## Run the Project

### Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Folder Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── app/                # Redux store and hooks
│   ├── assets/             # Images and other assets
│   ├── components/         # Reusable components
│   │   └── ui/             # UI components (button, card, input, etc.)
│   ├── features/           # Feature-based modules (auth)
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   ├── services/           # API service files
│   ├── styles/             # Global styles
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global CSS
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── components.json         # Shadcn UI components configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.js          # Vite configuration
```

## Screenshots

*(Placeholder for application screenshots)*

## Author

[Your Name]

## Future Enhancements

- Two-factor authentication (2FA) UI
- OAuth integration (Google, Facebook, GitHub)
- User profile management
- Dashboard analytics
- Dark/light mode toggle
- Internationalization (i18n) support
- Accessibility improvements
- Unit and integration tests
- Loading skeletons for better UX
- Toast notifications for user feedback
- Remember me functionality
- Account settings page
- Session management UI

## License

This project is licensed under the MIT License - see the LICENSE file for details.