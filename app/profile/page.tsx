'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    role: '',
    companyName: '',
    contactPerson: '',
    phone: '',
    address: ''
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Load existing profile
        const profileDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data() as any);
        }
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        email: user.email,
        updatedAt: new Date().toISOString()
      });
      alert('Profile saved successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6' }}>
      <header style={{
        background: 'linear-gradient(135deg, #1a2332 0%, #2d3e52 100%)',
        padding: '1.5rem 2rem',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '900' }}>PLAT∞NIX</h1>
          <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Complete Your Profile</p>
        </div>
      </header>

      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 2rem' }}>
        <form onSubmit={handleSave} style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Profile</h2>

          {/* Role Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
              I am a: *
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ 
                flex: 1,
                padding: '1rem',
                border: profile.role === 'haulier' ? '3px solid #00ffc3' : '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                background: profile.role === 'haulier' ? '#f0fdf9' : 'white'
              }}>
                <input
                  type="radio"
                  name="role"
                  value="haulier"
                  checked={profile.role === 'haulier'}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  required
                  style={{ marginRight: '0.5rem' }}
                />
                <strong>Haulier</strong>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                  I have vehicles and want to fill empty returns
                </div>
              </label>

              <label style={{ 
                flex: 1,
                padding: '1rem',
                border: profile.role === 'distributor' ? '3px solid #00ffc3' : '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                background: profile.role === 'distributor' ? '#f0fdf9' : 'white'
              }}>
                <input
                  type="radio"
                  name="role"
                  value="distributor"
                  checked={profile.role === 'distributor'}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  required
                  style={{ marginRight: '0.5rem' }}
                />
                <strong>Distributor</strong>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                  I need to ship goods
                </div>
              </label>
            </div>
          </div>

          {/* Company Name */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
              Company Name *
            </label>
            <input
              type="text"
              value={profile.companyName}
              onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              placeholder="ABC Haulage Ltd"
            />
          </div>

          {/* Contact Person */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
              Contact Person *
            </label>
            <input
              type="text"
              value={profile.contactPerson}
              onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              placeholder="John Smith"
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
              Phone Number *
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              placeholder="07700 900123"
            />
          </div>

          {/* Address */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
              Address *
            </label>
            <textarea
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              required
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
              placeholder="123 Business Park, Manchester M1 1AA"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              width: '100%',
              background: saving ? '#cbd5e1' : '#00ffc3',
              color: '#1a2332',
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}