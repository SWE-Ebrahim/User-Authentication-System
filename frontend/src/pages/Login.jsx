// Login Page Component
// This component provides the user authentication interface where users can sign in with their email and password.
// It handles form validation, API communication, and user feedback through error/success messages.
// Upon successful login, users are redirected to the dashboard page.

import { useState } from 'react'; // React hook for managing component state
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import { Button } from '@/components/ui/button'; // Custom UI button component
import { Input } from '@/components/ui/input'; // Custom UI input field component
import { Label } from '@/components/ui/label'; // Custom UI form label component
import { Icons } from '@/components/ui/icons'; // Collection of SVG icons
import { motion } from 'framer-motion'; // Animation library for smooth transitions

// API service for making authenticated requests to the backend
import api from '@/services/api';

// Login page component - handles user authentication
export default function Login() {
  // Form data for user login credentials
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // Loading state for async operations
  const [loading, setLoading] = useState(false);
  
  // Error and success messages
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Send login credentials to backend
      const response = await api.post('/auth/login', formData);
      
      if (response.data.status === 'success') {
        setMessage('Login successful! Redirecting...');
        // After successful login, redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      // Handle login errors
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container with gradient background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card container for the login form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-center mb-8"
          >
            {/* Lock icon representing security */}
            <div className="mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <Icons.lock className="h-8 w-8 text-white" />
            </div>
            {/* Page heading */}
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            {/* Page subtitle */}
            <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
          </motion.div>

          {/* Error message display */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 shadow-sm"
            >
              <Icons.alertCircle className="h-5 w-5 shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Success message display */}
          {message && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 shadow-sm"
            >
              <Icons.checkCircle className="h-5 w-5 shrink-0" />
              <span className="text-sm">{message}</span>
            </motion.div>
          )}

          {/* Login form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {/* Email input field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-5 px-4 transition-all"
                />
              </div>
            </div>

            {/* Password input field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                {/* Password recovery link */}
                <a 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-5 px-4 transition-all"
                />
              </div>
            </div>

            {/* Submit button for login */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </motion.form>

          {/* Link to signup page for new users */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign up
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}