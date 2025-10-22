import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      isSatellite={true}
      domain="hotel-booking-frontend-three-weld.vercel.app"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider >
  </StrictMode>,
)
