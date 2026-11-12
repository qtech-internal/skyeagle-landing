import { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';

export default function App() {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#070b13' }}>
      {/* Toast Notification Alert */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            background: 'rgba(15, 23, 42, 0.95)',
            border: `1px solid ${
              toast.type === 'success'
                ? 'rgba(34, 197, 94, 0.5)'
                : toast.type === 'danger'
                ? 'rgba(239, 68, 68, 0.5)'
                : 'rgba(96, 165, 250, 0.5)'
            }`,
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6)',
            zIndex: 99999,
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(16px)',
            animation: 'fl-phone-content-in 0.25s ease-out'
          }}
        >
          <span>{toast.type === 'success' ? '✅' : '⚡'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* SkyEagle Landing Page */}
      <LandingPage
        brandName="SkyEagle"
        showToast={showToast}
      />
    </div>
  );
}
