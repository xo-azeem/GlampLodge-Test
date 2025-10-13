import React from 'react';
import { motion } from 'framer-motion';

interface AccommodationCardSkeletonProps {
  className?: string;
}

export const AccommodationCardSkeleton: React.FC<AccommodationCardSkeletonProps> = ({ 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg border h-full ${className}`}
      style={{
        background: 'rgba(var(--background-rgb), 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.15)'
      }}
    >
      {/* Image Skeleton */}
      <div className="aspect-[5/4] xs:aspect-[4/3] sm:aspect-[16/10] md:aspect-[5/4] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden relative">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          </div>
          <div className="text-right ml-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-1 animate-pulse" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mr-4 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-6 flex-1">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse" />
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-3 animate-pulse" />
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-auto">
          <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse" />
          <div className="w-20 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};
