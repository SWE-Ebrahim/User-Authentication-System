import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { motion } from 'framer-motion';
import api from '@/services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First check if user is authenticated
        const response = await api.get('/auth/protected');
        if (response.data.status === 'success') {
          setUser(response.data.user);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4">
            <Icons.spinner className="h-full w-full" />
          </div>
          <p className="text-lg text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-lg w-10 h-10 flex items-center justify-center shadow-md">
                <Icons.user className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Auth System
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                onClick={handleLogout}
                className="rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Icons.logOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/20"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-linear-to-r from-blue-100 to-indigo-100 rounded-xl w-16 h-16 flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-inner">
                <Icons.user className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Welcome, {user?.name || 'User'}!
                </h1>
                <p className="text-gray-600 mt-1">You are successfully logged in to your account</p>
              </div>
            </div>
            
            <motion.div 
              className="mt-6 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                  className="flex justify-between items-center pb-3 border-b border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">{user?.username || 'N/A'}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center pb-3 border-b border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-900">{user?.email || 'N/A'}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <span className="text-gray-600">Account Status:</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <Icons.checkCircle className="h-4 w-4" />
                    Verified
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item, index) => (
              <motion.div 
                key={item}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index + 0.6, duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-linear-to-r from-blue-100 to-indigo-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4 shadow-inner">
                  <Icons.settings className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Feature {item}</h3>
                <p className="text-gray-600 text-sm mb-4">Description of feature {item} goes here.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-lg border-t border-white/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Auth System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}