import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import VerifyEmail from '@/pages/VerifyEmail';
import VerifyOTP from '@/pages/VerifyOTP';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Dashboard from '@/pages/Dashboard';

// Main application component that handles all routing
function App() {
  return (
    // Router component to enable routing functionality
    <Router>
      {/* Main app container with minimum height to fill screen */}
      <div className="min-h-screen w-full bg-white">
        {/* Define all application routes */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />
          {/* User registration route */}
          <Route path="/signup" element={<Signup />} />
          {/* User login route */}
          <Route path="/login" element={<Login />} />
          {/* Email verification route */}
          <Route path="/verify-email" element={<VerifyEmail />} />
          {/* Email verification with token parameter route */}
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          {/* OTP verification route */}
          <Route path="/verify-otp" element={<VerifyOTP />} />
          {/* Password recovery route */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Password reset route */}
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* User dashboard route (protected) */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;