export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        // Custom breakpoints for your specific requirements
        'xs': '320px',   // Mobile: 320px - 480px
        'sm-custom': '481px',   // Tablet: 481px - 768px
        'md-custom': '769px',   // Small Desktop: 769px - 1024px
        'lg-custom': '1025px',  // Large Desktop: 1025px+
        
        // Standard CSS framework breakpoints
        'sm': '576px',   // Small devices (landscape phones)
        'md': '768px',   // Medium devices (tablets)
        'lg': '992px',   // Large devices (desktops)
        'xl': '1200px',  // Extra large devices (large desktops)
        '2xl': '1536px', // 2X large devices (larger desktops)
      },
      colors: {
        text: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)',
        },
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
        },
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
};