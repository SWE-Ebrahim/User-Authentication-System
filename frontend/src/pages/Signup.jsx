import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { motion } from 'framer-motion';
import api from '@/services/api';

// Signup page component - handles user registration and email verification
export default function Signup() {
  // State for tracking which step of the signup process we're on
  // Step 1: Registration form, Step 2: Email verification
  const [step, setStep] = useState(1);
  
  // Form data for user registration
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  // State for storing the email verification code
  const [verificationCode, setVerificationCode] = useState('');
  
  // Loading state for async operations
  const [loading, setLoading] = useState(false);
  
  // Success and error messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to calculate password strength
  const getPasswordStrength = (password) => {
    let strength = 0;
    // Track which password criteria are met
    let criteria = {
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      special: false
    };

    // Check password length (minimum 8 characters)
    if (password.length >= 8) {
      strength += 1;
      criteria.length = true;
    }
    
    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      strength += 1;
      criteria.lowercase = true;
    }
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      strength += 1;
      criteria.uppercase = true;
    }
    
    // Check for numbers
    if (/[0-9]/.test(password)) {
      strength += 1;
      criteria.number = true;
    }
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
      criteria.special = true;
    }

    return { strength, criteria };
  };

  // Get password strength data
  const passwordStrength = getPasswordStrength(formData.password);

  // Get strength label and color based on strength score
  const getStrengthInfo = (strength) => {
    if (strength <= 2) return { label: 'Weak', color: 'bg-red-500', width: '20%' };
    if (strength === 3) return { label: 'Fair', color: 'bg-orange-500', width: '40%' };
    if (strength === 4) return { label: 'Good', color: 'bg-yellow-500', width: '70%' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const strengthInfo = getStrengthInfo(passwordStrength.strength);

  // Handle user registration form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Send registration data to backend
      const response = await api.post('/auth/signup', formData);
      
      if (response.data.status === 'success') {
        setMessage('Account created! Please check your email for verification.');
        // After successful registration, move to verification step
        setTimeout(() => {
          setStep(2);
        }, 1500);
      }
    } catch (err) {
      // Handle registration errors
      setError(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  // Handle email verification with code
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Send verification code to backend
      const response = await api.post('/auth/verify-email', {
        email: formData.email,
        code: verificationCode
      });
      
      if (response.data.status === 'success') {
        setMessage('Email verified successfully! Redirecting to login...');
        // After successful verification, redirect to login
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      // Handle verification errors
      setError(err.response?.data?.message || 'Invalid verification code');
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
        {/* Card container for the form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-center mb-8"
          >
            {/* Icon representing the current step */}
            <div className="mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <Icons.user className="h-8 w-8 text-white" />
            </div>
            {/* Dynamic heading based on current step */}
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              {step === 1 ? 'Create Account' : 'Verify Email'}
            </h1>
            {/* Dynamic subtitle based on current step */}
            <p className="text-gray-600 mt-2">
              {step === 1 
                ? 'Sign up for a new account' 
                : `Enter the verification code sent to ${formData.email}`}
            </p>
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

          {/* Render either registration form or verification form based on step */}
          {step === 1 ? (
            // Registration form (Step 1)
            <motion.form 
              onSubmit={handleSignup} 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {/* Username input field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.user className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength="3"
                    maxLength="20"
                    className="pl-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-5 px-4 transition-all"
                  />
                </div>
              </div>

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

              {/* Password input field with strength indicator */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
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
                    minLength="8"
                    className="pl-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-5 px-4 transition-all"
                  />
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Password Strength</span>
                      <span className={`text-sm font-medium ${passwordStrength.strength <= 2 ? 'text-red-500' : passwordStrength.strength === 3 ? 'text-orange-500' : passwordStrength.strength === 4 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {strengthInfo.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${strengthInfo.color} transition-all duration-300`}
                        style={{ width: strengthInfo.width }}
                      ></div>
                    </div>
                    
                    {/* Password Criteria */}
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      <div className={`text-xs flex items-center ${passwordStrength.criteria.length ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.criteria.length ? (
                          <Icons.check className="h-3 w-3 mr-1" />
                        ) : (
                          <Icons.x className="h-3 w-3 mr-1" />
                        )}
                        8+ characters
                      </div>
                      <div className={`text-xs flex items-center ${passwordStrength.criteria.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.criteria.lowercase ? (
                          <Icons.check className="h-3 w-3 mr-1" />
                        ) : (
                          <Icons.x className="h-3 w-3 mr-1" />
                        )}
                        Lowercase letter
                      </div>
                      <div className={`text-xs flex items-center ${passwordStrength.criteria.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.criteria.uppercase ? (
                          <Icons.check className="h-3 w-3 mr-1" />
                        ) : (
                          <Icons.x className="h-3 w-3 mr-1" />
                        )}
                        Uppercase letter
                      </div>
                      <div className={`text-xs flex items-center ${passwordStrength.criteria.number ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.criteria.number ? (
                          <Icons.check className="h-3 w-3 mr-1" />
                        ) : (
                          <Icons.x className="h-3 w-3 mr-1" />
                        )}
                        Number
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit button for registration */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Icons.spinner className="h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </motion.form>
          ) : (
            // Email verification form (Step 2)
            <motion.form 
              onSubmit={handleVerify} 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {/* Verification code input fields */}
              <div className="space-y-2">
                <Label htmlFor="verificationCode" className="text-gray-700 font-medium">Verification Code</Label>
                <div className="flex justify-center gap-3">
                  {/* Six individual input fields for the 6-digit code */}
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      value={verificationCode[i] || ''}
                      onChange={(e) => {
                        const newCode = verificationCode.split('');
                        newCode[i] = e.target.value.slice(0, 1);
                        setVerificationCode(newCode.join(''));
                        
                        // Auto-focus next input when a digit is entered
                        if (e.target.value && i < 5) {
                          document.getElementById(`code-${i + 1}`).focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace to move to previous input
                        if (e.key === 'Backspace' && !verificationCode[i] && i > 0) {
                          document.getElementById(`code-${i - 1}`).focus();
                        }
                      }}
                      id={`code-${i}`}
                      className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">Enter the 6-digit code sent to your email</p>
              </div>

              {/* Submit button for verification */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Icons.spinner className="h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>
              
              {/* Back button to return to registration form */}
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full rounded-xl border-gray-300 text-gray-700 py-5 shadow hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Back to Signup
              </Button>
            </motion.form>
          )}

          {/* Link to login page for existing users */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign in
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}