# AuthProject

A full-stack authentication system with a React frontend and Node.js/Express backend, featuring email verification, password reset, JWT authentication, and a clean, responsive UI.

## Project Overview

AuthProject is a complete authentication solution designed to provide a secure and user-friendly experience for managing user accounts. The system implements industry-standard security practices and follows modern development patterns to ensure maintainability and scalability.

This monorepo contains three main components:
1. **Backend** - A secure Node.js/Express API with MongoDB integration
2. **Frontend** - A responsive React application with modern UI components
3. **Documentation** - Technical documentation and diagrams explaining the system architecture

## Features

### Backend Features
- User Registration with Email Verification
- Secure Login/Logout System
- Password Encryption using bcrypt
- JSON Web Token (JWT) Authentication
- Password Reset via Email OTP
- Rate Limiting Protection
- NoSQL Injection Prevention
- Cross-Site Scripting (XSS) Protection
- HTTP Parameter Pollution Prevention
- CORS Enabled
- Environment-based Configuration

### Frontend Features
- Responsive UI with Tailwind CSS
- Form Validation with Zod and React Hook Form
- State Management with Redux Toolkit
- Route Protection for Authenticated Pages
- Smooth Animations with Framer Motion
- Component-based Architecture
- Environment-based Configuration

### Security Features
- Password Hashing with bcrypt
- JWT-based Authentication
- Email Verification Workflow
- Secure Password Reset Process
- Rate Limiting
- Input Sanitization
- XSS Prevention
- HTTP Security Headers

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM) library
- **JSON Web Tokens (JWT)** - Token-based authentication
- **Bcrypt.js** - Password hashing algorithm
- **Nodemailer** - Email sending library

### Frontend
- **React 18** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **React Router v7** - Declarative routing for React
- **Redux Toolkit** - State management solution
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **React Hook Form** - Performant, flexible forms with easy validation
- **Zod** - TypeScript-first schema declaration and validation

## Project Structure

```
AuthProject/
├── Documentation/
│   ├── DatabaseSQLQuery.sql        # Database schema in SQL format
│   ├── SequenceDiagram_AuthProject.png  # System sequence diagram
│   └── User_Authentication_System_DOC.odt  # Detailed system documentation
├── backend/
│   ├── config/                     # Configuration files
│   ├── controllers/                # Request handlers
│   ├── middlewares/                # Custom middleware functions
│   ├── models/                     # Database models
│   ├── routes/                     # API route definitions
│   ├── utils/                      # Utility functions
│   ├── app.js                      # Express application setup
│   └── server.js                   # Server entry point
├── frontend/
│   ├── src/
│   │   ├── app/                    # Redux store and hooks
│   │   ├── components/             # Reusable components
│   │   ├── features/               # Feature-based modules
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API service files
│   │   ├── App.jsx                 # Main application component
│   │   └── main.jsx                # Application entry point
│   └── index.html                  # HTML template
└── README.md                       # This file
```

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud instance)
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Set up the backend:
```bash
cd backend
npm install
# Create .env file with required environment variables
npm run dev
```

3. Set up the frontend:
```bash
cd frontend
npm install
# Create .env file with required environment variables
npm run dev
```

### Environment Variables

Each component (backend and frontend) requires its own environment variables. See the individual README files in each directory for detailed information.

## API Endpoints

The backend provides RESTful API endpoints for all authentication flows. Detailed endpoint documentation can be found in the backend README.

Main endpoint categories:
- User Registration and Email Verification
- Login and Logout
- Password Recovery and Reset
- Protected Routes

## Documentation

The [Documentation](./Documentation) folder contains important technical documents:

1. [DatabaseSQLQuery.sql](./Documentation/DatabaseSQLQuery.sql) - Database schema definition in SQL format
2. [SequenceDiagram_AuthProject.png](./Documentation/SequenceDiagram_AuthProject.png) - Visual representation of system workflows
3. [User_Authentication_System_DOC.odt](./Documentation/User_Authentication_System_DOC.odt) - Comprehensive documentation of the system architecture and functionality

## Deployment

### Backend Deployment
```bash
cd backend
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Serve the dist folder with your preferred web server
```

## Screen Shots
[Home Page](./Documentation/HomePage.png)
[Login Page](./Documentation/LoginPage.png)
[Signup Page](./Documentation/SignupPage.png)
[Forgot Password Page](./Documentation/ForgotPassPage.png)
[OTP Page](./Documentation/OTPExample.png)

## Future Enhancements

- Two-factor authentication (2FA)
- OAuth integration (Google, Facebook, GitHub)
- Role-based access control (RBAC)
- Account lockout after failed attempts
- Session management dashboard
- Unit and integration tests
- Docker containerization
- API documentation with Swagger
- User profile management
- Dashboard analytics

## Author

Ebrahim Almahbosh - ETechStudio

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/ebrahim_techstudio)
[![TikTok](https://img.shields.io/badge/TikTok-%23000000.svg?logo=TikTok&logoColor=white)](https://tiktok.com/@etechstudio)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/@EbrahimTechStudio)
[![Upwork](https://img.shields.io/badge/Upwork-%235DCB8D.svg?logo=Upwork&logoColor=white)](https://upwork.com/freelancers/~01f9d0f7a460204c9d?mp_source=share)

## License

This project is licensed under the MIT License - see the LICENSE file for details.