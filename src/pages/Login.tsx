import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface FormData {
  email: string;
  password: string;
  displayName: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  displayName?: string;
}

export const Login: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle, 
    loading, 
    error, 
    clearError
  } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    displayName: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // Display name validation for sign up
    if (!isLogin && !formData.displayName) {
      errors.displayName = 'Full name is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmail(formData.email, formData.password);
      } else {
        await signUpWithEmail(formData.email, formData.password, formData.displayName);
      }
      navigate('/home');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/home');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', displayName: '' });
    setFormErrors({});
    clearError();
  };

  const getInputError = (field: keyof FormErrors): string | undefined => {
    return formErrors[field];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-all duration-300"
         style={{
           background: theme === 'dark'
             ? 'linear-gradient(135deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 100%)'
             : 'linear-gradient(135deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 100%)'
         }}>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'var(--primary)' }}
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-10"
          style={{ background: 'var(--accent)' }}
        />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-md z-10"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/Logo 1 tbg.png" 
              alt="Glamp Lodges Logo" 
              className="h-52 w-auto"
            />
          </div>
          <h1 className="text-2xl font-light tracking-tight" style={{ color: 'var(--text)' }}>
            Glamp Lodges
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            Where luxury meets adventure
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl border transition-all duration-500"
          style={{
            background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`,
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(var(--border-rgb), 0.4)',
            boxShadow: theme === 'dark' 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Mode Toggle */}
          <div className="flex mb-8 bg-muted/50 rounded-2xl p-1">
            <motion.button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                isLogin ? 'text-white' : 'text-text-secondary'
              }`}
              style={{
                background: isLogin ? 'var(--primary)' : 'transparent'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                !isLogin ? 'text-white' : 'text-text-secondary'
              }`}
              style={{
                background: !isLogin ? 'var(--primary)' : 'transparent'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="displayName"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-transparent border rounded-2xl text-text placeholder-text-secondary/60 focus:outline-none transition-all duration-300 ${
                        getInputError('displayName') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'focus:border-primary'
                      }`}
                      style={{ 
                        borderColor: getInputError('displayName') 
                          ? '#ef4444' 
                          : 'rgba(var(--border-rgb), 0.4)' 
                      }}
                    />
                    {getInputError('displayName') && (
                      <p className="mt-2 text-sm text-red-500">{getInputError('displayName')}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-12 pr-4 py-4 bg-transparent border rounded-2xl text-text placeholder-text-secondary/60 focus:outline-none transition-all duration-300 ${
                  getInputError('email') 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'focus:border-primary'
                }`}
                style={{ 
                  borderColor: getInputError('email') 
                    ? '#ef4444' 
                    : 'rgba(var(--border-rgb), 0.4)' 
                }}
              />
              {getInputError('email') && (
                <p className="mt-2 text-sm text-red-500">{getInputError('email')}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-12 pr-12 py-4 bg-transparent border rounded-2xl text-text placeholder-text-secondary/60 focus:outline-none transition-all duration-300 ${
                  getInputError('password') 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'focus:border-primary'
                }`}
                style={{ 
                  borderColor: getInputError('password') 
                    ? '#ef4444' 
                    : 'rgba(var(--border-rgb), 0.4)' 
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {getInputError('password') && (
                <p className="mt-2 text-sm text-red-500">{getInputError('password')}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 rounded-2xl font-medium text-white flex items-center justify-center group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'var(--primary)',
                boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.2)'
              }}
            >
              <span>{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
              {!loading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-text-secondary" style={{ background: 'var(--background)' }}>
                  or
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <motion.button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 rounded-2xl font-medium border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </motion.button>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl text-sm border"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  color: '#ef4444'
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{error}</span>
                  <button
                    type="button"
                    onClick={clearError}
                    className="ml-2 text-xs underline hover:no-underline"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          {/* Forgot Password */}
          {isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6"
            >
              <button 
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot your password?
              </button>
            </motion.div>
          )}

          {/* Terms */}
          {!isLogin && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-center mt-6 text-text-secondary"
            >
              By creating an account, you agree to our{' '}
              <button 
                type="button"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button 
                type="button"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </button>
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};