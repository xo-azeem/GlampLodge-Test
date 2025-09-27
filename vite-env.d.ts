/// <reference types="vite/client" />


interface ImportMetaEnv {
  // Firebase Configuration (Public - Safe to expose)
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string
  
  // Admin Emails (Public - Safe to expose as they're just for role checking)
  readonly VITE_ADMIN_EMAILS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
