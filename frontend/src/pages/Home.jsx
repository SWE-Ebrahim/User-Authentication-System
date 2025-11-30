import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { motion } from 'framer-motion';

// Home page component - the main landing page for unauthenticated users
export default function Home() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Features data to display on the home page
  const features = [
    {
      icon: Icons.mail,
      title: 'Email Verification',
      description: 'Secure account creation with email verification process.'
    },
    {
      icon: Icons.shield,
      title: 'OTP Login',
      description: 'Two-factor authentication with one-time password sent to your email.'
    },
    {
      icon: Icons.lock,
      title: 'Password Reset',
      description: 'Secure password reset functionality with OTP verification.'
    }
  ];

  return (
    // Main container with gradient background
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header section with navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and brand name */}
            <div className="flex items-center">
              <motion.div 
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl w-10 h-10 flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icons.lock className="h-6 w-6 text-white" />
              </motion.div>
              <motion.span 
                className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Auth System
              </motion.span>
            </div>
            {/* Desktop navigation buttons */}
            <div className="hidden md:flex space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="rounded-lg border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm"
                >
                  Login
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Button>
              </motion.div>
            </div>
            {/* Mobile navigation buttons */}
            <div className="md:hidden flex items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/login')}
                className="mr-2 border-gray-300"
              >
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/signup')}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section with main call-to-action */}
      <main className="grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main heading with gradient text */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Secure Authentication System
            </motion.h1>
            {/* Subheading with description */}
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              A modern authentication system with email verification, OTP login, and password reset functionality.
            </motion.p>
            
            {/* Call-to-action buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/signup')}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Create Account
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="rounded-xl border-gray-300 hover:bg-gray-50 px-8 py-4 text-base shadow-sm transition-all duration-300"
                >
                  Login to Account
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Features section */}
          <motion.div 
            className="mt-16 md:mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4 mx-auto shadow-inner">
                    <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Benefits section */}
        <div className="bg-gradient-to-r from-white to-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-14 md:mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Authentication System?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our authentication system provides enterprise-grade security features with an easy-to-use interface.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {/* Benefit 1: Secure & Reliable */}
              <motion.div 
                className="flex items-start space-x-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-3 shrink-0 shadow-inner">
                  <Icons.checkCircle className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Reliable</h3>
                  <p className="text-gray-600">
                    Industry-standard encryption and security practices to keep your data safe.
                  </p>
                </div>
              </motion.div>
              
              {/* Benefit 2: Fast & Efficient */}
              <motion.div 
                className="flex items-start space-x-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-3 shrink-0 shadow-inner">
                  <Icons.zap className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fast & Efficient</h3>
                  <p className="text-gray-600">
                    Optimized performance for quick authentication and smooth user experience.
                  </p>
                </div>
              </motion.div>
              
              {/* Benefit 3: Multi-Factor Auth */}
              <motion.div 
                className="flex items-start space-x-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-3 shrink-0 shadow-inner">
                  <Icons.shieldCheck className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Factor Auth</h3>
                  <p className="text-gray-600">
                    Enhanced security with optional two-factor authentication methods.
                  </p>
                </div>
              </motion.div>
              
              {/* Benefit 4: User Friendly */}
              <motion.div 
                className="flex items-start space-x-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-3 shrink-0 shadow-inner">
                  <Icons.users className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">User Friendly</h3>
                  <p className="text-gray-600">
                    Intuitive interface designed for seamless user onboarding and authentication.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Auth System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}