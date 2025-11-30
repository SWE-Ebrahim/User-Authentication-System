import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { motion } from 'framer-motion';
import api from '@/services/api';

// Verify OTP page component - verifies different types of OTP codes (email verification, login, password reset)
export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const { email, type } = location.state || {}; // type can be 'email-verification' or 'login' or 'reset-password'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    try {
      let endpoint, payload;
      
      if (type === 'email-verification') {
        endpoint = '/auth/verify-email';
        payload = {
          email,
          code: otp
        };
      } else if (type === 'login') {
        endpoint = '/auth/verify-login-otp';
        payload = {
          email,
          otp
        };
      } else if (type === 'reset-password') {
        endpoint = '/auth/reset-password';
        payload = {
          email,
          otp,
          password: 'newPassword123' // In real app, you'd have a separate form for this
        };
      } else {
        throw new Error('Invalid verification type');
      }

      const response = await api.post(endpoint, payload);
      
      if (response.data.status === 'success') {
        if (type === 'email-verification') {
          setMessage('Email verified successfully! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        } else if (type === 'login') {
          setMessage('Login successful! Redirecting to dashboard...');
          // Store token or handle successful login
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else if (type === 'reset-password') {
          setMessage('Password reset successfully! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-center mb-8"
          >
            <div className="mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <Icons.key className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Verify OTP
            </h1>
            <p className="text-gray-600 mt-2">
              Enter the 6-digit code sent to {email || 'your email'}
            </p>
          </motion.div>

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

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-gray-700 font-medium">OTP Code</Label>
              <div className="flex justify-center gap-3">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    value={otp[i] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('');
                      newOtp[i] = e.target.value.slice(0, 1);
                      setOtp(newOtp.join(''));
                      
                      // Auto-focus next input
                      if (e.target.value && i < 5) {
                        document.getElementById(`otp-${i + 1}`).focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace
                      if (e.key === 'Backspace' && !otp[i] && i > 0) {
                        document.getElementById(`otp-${i - 1}`).focus();
                      }
                    }}
                    id={`otp-${i}`}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center">Enter the 6-digit code sent to your email</p>
            </div>

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
                'Verify'
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full rounded-xl border-gray-300 text-gray-700 py-5 shadow hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Back
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}