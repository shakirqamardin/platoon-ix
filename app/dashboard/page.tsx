'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6' }}>
      <header style={{
        background: 'linear-gradient(135deg, #1a2332 0%, #2d3e52 100%)',
        padding: '1.5rem 2rem',
        color: 'white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '900' }}>
            PLAT∞NIX
          </h1>
          <button
            onClick={handleSignOut}
            style={{
              background: '#00ffc3',
              color: '#1a2332',
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            🎉 Welcome to Platoonix!
          </h2>
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>
            You're successfully logged in as: <strong>{user?.email}</strong>
          </p>
          <p style={{ color: '#64748b' }}>
            Your backend authentication is working! This is where we'll build:
          </p>
          <ul style={{ marginTop: '1rem', marginLeft: '2rem', color: '#64748b' }}>
            <li>✅ User authentication (DONE!)</li>
            <li>⏳ Match management system</li>
            <li>⏳ In-app messaging</li>
            <li>⏳ Payment integration</li>
            <li>⏳ Admin dashboard</li>
          </ul>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            Quick Links
          </h3>
          <a 
            href="/index.html"
            style={{
              display: 'inline-block',
              background: '#00ffc3',
              color: '#1a2332',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '700',
              marginRight: '1rem'
            }}
          >
            View Current Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}