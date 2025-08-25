import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, Shield, Edit3, Save, X, LogOut, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProfileFormData {
  displayName: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

export const UserProfile: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { user, userProfile, signOut, updateUserProfile, loading } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: '',
    email: '',
    role: '',
    createdAt: '',
    lastLogin: ''
  });
  const [originalData, setOriginalData] = useState<ProfileFormData>({
    displayName: '',
    email: '',
    role: '',
    createdAt: '',
    lastLogin: ''
  });

  useEffect(() => {
    if (userProfile) {
      const formatDate = (date: any) => {
        if (!date) return 'Unknown';
        
        try {
          let dateObj: Date;
          
          // Handle different date formats
          if (date.toDate && typeof date.toDate === 'function') {
            // Firestore timestamp
            dateObj = date.toDate();
          } else if (date instanceof Date) {
            // Regular Date object
            dateObj = date;
          } else if (typeof date === 'string') {
            // String date
            dateObj = new Date(date);
          } else if (typeof date === 'number') {
            // Timestamp number
            dateObj = new Date(date);
          } else {
            // Fallback
            dateObj = new Date(date);
          }
          
          // Check if date is valid
          if (isNaN(dateObj.getTime())) {
            return 'Unknown';
          }
          
          return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        } catch (error) {
          console.error('Date formatting error:', error, date);
          return 'Unknown';
        }
      };

      const data = {
        displayName: userProfile.displayName || 'Unknown User',
        email: userProfile.email || '',
        role: userProfile.role || 'customer',
        createdAt: formatDate(userProfile.createdAt),
        lastLogin: formatDate(userProfile.lastLogin)
      };
      setFormData(data);
      setOriginalData(data);
    }
  }, [userProfile]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user || !userProfile) return;
    
    try {
      setIsSaving(true);
      setSaveError(null);
      
      // Update in Firebase
      await updateUserProfile(user.uid, {
        displayName: formData.displayName
      });
      
      // Update local state
      setOriginalData(formData);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setSaveError(error.message || 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-all duration-300"
         style={{
           background: theme === 'dark'
             ? 'linear-gradient(135deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 100%)'
             : 'linear-gradient(135deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 100%)'
         }}>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-500"
        style={{
          background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`,
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(var(--border-rgb), 0.4)'
        }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full transition-all duration-300"
            style={{ color: 'var(--text)' }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
            Profile
          </h1>
          
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-2xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold"
            >
              {userProfile.displayName?.charAt(0)?.toUpperCase() || 'U'}
            </motion.div>
            
          </div>
          
          <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text)' }}>
            {userProfile.displayName || 'Unknown User'}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {userProfile.role === 'admin' ? 'Administrator' : 'Customer'}
          </p>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl border transition-all duration-500"
          style={{
            background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`,
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(var(--border-rgb), 0.4)',
            boxShadow: theme === 'dark' 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Edit Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
              Personal Information
            </h3>
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.button
                  key="edit"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    background: 'var(--primary)',
                    color: 'white'
                  }}
                >
                  <Edit3 size={16} />
                  Edit
                </motion.button>
              ) : (
                <div className="flex gap-2">
                                     <motion.button
                     key="save"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     onClick={handleSave}
                     disabled={isSaving}
                     whileHover={{ scale: isSaving ? 1 : 1.05 }}
                     whileTap={{ scale: isSaving ? 1 : 0.95 }}
                     className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                     style={{
                       background: 'var(--primary)',
                       color: 'white'
                     }}
                   >
                     {isSaving ? (
                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                     ) : (
                       <Save size={16} />
                     )}
                     {isSaving ? 'Saving...' : 'Save'}
                   </motion.button>
                  <motion.button
                    key="cancel"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleCancel}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border-2"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text)'
                    }}
                  >
                    <X size={16} />
                    Cancel
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Display Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                <User size={16} />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border rounded-2xl text-text placeholder-text-secondary/60 focus:outline-none transition-all duration-300"
                  style={{ 
                    borderColor: 'rgba(var(--border-rgb), 0.4)',
                    background: 'rgba(var(--background-rgb), 0.1)'
                  }}
                />
              ) : (
                <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(var(--background-rgb), 0.1)' }}>
                  <span style={{ color: 'var(--text)' }}>{formData.displayName}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                <Mail size={16} />
                Email Address
              </label>
              <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(var(--background-rgb), 0.1)' }}>
                <span style={{ color: 'var(--text)' }}>{formData.email}</span>
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                <Shield size={16} />
                Account Type
              </label>
              <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(var(--background-rgb), 0.1)' }}>
                <span style={{ color: 'var(--text)' }}>
                  {formData.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
              </div>
            </div>

            {/* Created Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                <Calendar size={16} />
                Member Since
              </label>
              <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(var(--background-rgb), 0.1)' }}>
                <span style={{ color: 'var(--text)' }}>{formData.createdAt}</span>
              </div>
            </div>

            {/* Last Login */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                <Calendar size={16} />
                Last Login
              </label>
              <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(var(--background-rgb), 0.1)' }}>
                <span style={{ color: 'var(--text)' }}>{formData.lastLogin}</span>
              </div>
            </div>
            
            {/* Save Error Display */}
            {saveError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl text-sm text-red-600 bg-red-50 border border-red-200"
              >
                {saveError}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <motion.button
            onClick={handleLogout}
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-2xl font-medium border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
            style={{
              borderColor: '#ef4444',
              color: '#ef4444'
            }}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
