import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { motion } from 'framer-motion';
import api from '@/services/api';

// Email verification page component - verifies user email with code sent to their inbox
export default function VerifyEmail() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await api.post('/auth/verify-email', { email, code });
      if (response.data.status === 'success') {
        setMessage('Email verified successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(response.data.message || 'Email verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email verification failed');
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
              <Icons.mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Verify Email
            </h1>
            <p className="text-gray-600 mt-2">Enter your email and verification code</p>
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
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-5 px-4 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code" className="text-gray-700 font-medium">Verification Code</Label>
              <div className="flex justify-center gap-3">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    value={code[i] || ''}
                    onChange={(e) => {
                      const newCode = code.split('');
                      newCode[i] = e.target.value.slice(0, 1);
                      setCode(newCode.join(''));
                      
                      // Auto-focus next input
                      if (e.target.value && i < 5) {
                        document.getElementById(`code-${i + 1}`).focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace
                      if (e.key === 'Backspace' && !code[i] && i > 0) {
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
          </motion.form>

          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <a 
              href="/login" 
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              <Icons.arrowLeft className="h-4 w-4" />
              Back to Login
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}