# AuthProject Backend

A robust and secure authentication system built with Node.js, Express, and MongoDB. This backend service provides complete user authentication functionality including registration, login, email verification, password reset, and JWT-based session management.

## Description

AuthProject is a full-featured authentication backend designed to handle all aspects of user management in modern web applications. It implements industry-standard security practices including password hashing, JWT tokens, rate limiting, sanitization, and protection against common web vulnerabilities. 

The system features email verification during signup, secure password reset workflows, and protected routes with token-based authentication. Built with scalability and security in mind, it serves as a foundation for any application requiring reliable user authentication.

## Features

- User Registration with Email Verification
- Secure Login/Logout System
- Password Encryption using bcrypt
- JSON Web Token (JWT) Authentication
- Password Reset via Email OTP
- Email Sending with Nodemailer
- Rate Limiting Protection
- NoSQL Injection Prevention
- Cross-Site Scripting (XSS) Protection
- HTTP Parameter Pollution Prevention
- CORS Enabled
- Environment-based Configuration
- Error Handling Middleware
- Protected Routes with Authentication Middleware

## Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM) library
- **JSON Web Tokens (JWT)** - Token-based authentication
- **Bcrypt.js** - Password hashing algorithm
- **Nodemailer** - Email sending library
- **Dotenv** - Environment variable management
- **Helmet** - Security headers middleware
- **Express Rate Limit** - Rate limiting middleware
- **Express Mongo Sanitize** - NoSQL injection prevention
- **XSS** - Cross-site scripting prevention
- **HPP** - HTTP parameter pollution prevention
- **Cookie Parser** - Cookie parsing middleware
- **Validator** - String validation library

## Installation Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

| Variable | Description | Example |
|---------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `DATABASE` | MongoDB connection string | `mongodb+srv://username:password@cluster...` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-jwt-key` |
| `JWT_REFRESH_SECRET` | Secret key for refresh token | `your-super-secret-refresh-key` |
| `JWT_EXPIRES_IN` | Access token expiration | `7d` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration | `90d` |
| `JWT_COOKIE_EXPIRES_IN` | Cookie expiration | `14d` |
| `EMAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP server port | `587` |
| `EMAIL_USERNAME` | Email service username | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Email service password/app password | `your-app-password` |

## Run the Project

### Production Mode
```bash
npm start
```

### Development Mode (with auto-reload)
```bash
npm run dev
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/signup` | Register a new user |
| `POST` | `/api/v1/auth/verify-email` | Verify user email with OTP |
| `POST` | `/api/v1/auth/login` | User login |
| `GET` | `/api/v1/auth/logout` | User logout |
| `POST` | `/api/v1/auth/forgot-password` | Request password reset |
| `PATCH` | `/api/v1/auth/reset-password` | Reset password with OTP |
| `GET` | `/api/v1/auth/protected` | Protected test route |

### Health Check Route

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health` | Server health check |

## Folder Structure

```
backend/
├── config/
│   ├── Database.js         # Database connection
│   ├── Email.js            # Email configuration
│   └── JWT.js              # JWT configuration
├── controllers/
│   ├── AuthController.js   # Authentication logic
│   └── ErrorController.js  # Error handling logic
├── middlewares/
│   ├── Auth.js             # Authentication middleware
│   └── Security.js         # Security middleware
├── models/
│   └── User.js             # User data model
├── routes/
│   ├── AuthRoutes.js       # Authentication routes
│   └── Index.js            # Main router
├── utils/
│   ├── AppError.js         # Custom error class
│   ├── CatchAsync.js       # Async error wrapper
│   ├── Email.js            # Email sending utility
│   └── Jwt.js              # JWT utility functions
├── app.js                  # Express application setup
├── server.js               # Server entry point
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
└── package.json            # Project dependencies and scripts
```

## Screenshots

[Home Page](../Documentation/HomePage.png)
[Login Page](../Documentation/LoginPage.png)
[Signup Page](../Documentation/SignupPage.png)
[Forgot Password Page](../Documentation/ForgotPassPage.png)
[OTP Page](../Documentation/OTPExample.png)

## Author

Ebrahim Almahbosh - ETechStudio

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/ebrahim_techstudio)
[![TikTok](https://img.shields.io/badge/TikTok-%23000000.svg?logo=TikTok&logoColor=white)](https://tiktok.com/@etechstudio)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/@EbrahimTechStudio)
[![Upwork](https://img.shields.io/badge/Upwork-%235DCB8D.svg?logo=Upwork&logoColor=white)](https://upwork.com/freelancers/~01f9d0f7a460204c9d?mp_source=share)

## Future Enhancements

- Two-factor authentication (2FA)
- OAuth integration (Google, Facebook, GitHub)
- Role-based access control (RBAC)
- Account lockout after failed attempts
- Session management dashboard
- API request logging and monitoring
- Unit and integration tests
- Docker containerization
- API documentation with Swagger
- Refresh token rotation
- User profile management
- Social login options

## License

This project is licensed under the MIT License - see the LICENSE file for details.