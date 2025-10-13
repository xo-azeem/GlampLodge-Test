import React from 'react';

interface FlagIconProps {
  country: 'Pakistan' | 'International';
  size?: number;
  className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ 
  country, 
  size = 16, 
  className = '' 
}) => {
  if (country === 'Pakistan') {
    return (
      <svg
        width={size}
        height={size * (2 / 3)} // Pakistan flag aspect ratio
        viewBox="0 0 60 40"
        className={`inline-block ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Pakistan</title>
        {/* Green background */}
        <rect width="60" height="40" fill="#01411C" />
        {/* White vertical stripe */}
        <rect width="12" height="40" fill="#FFFFFF" />
        {/* Crescent and star */}
        <path
          d="M38 20a10 10 0 1 1 -10 -10 8 8 0 1 0 10 10z"
          fill="#FFFFFF"
        />
        <polygon
          points="38,14 39.8,19 35,16 41,16 36.2,19"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (country === 'International') {
    return (
      <span 
        className={`inline-block ${className}`}
        style={{
          fontSize: `${size}px`,
          lineHeight: 1
        }}
        title="International"
      >
        🌍
      </span>
    );
  }

  return null;
};
