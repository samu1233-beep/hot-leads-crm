'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  function login() {
    if (pw === 'MassaPannu185.x!..') {
      document.cookie = 'crm-auth=ok; path=/; max-age=604800';
      router.push('/');
    } else {
      setError(true);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f7fb' }}>
      <div style={{ background: 'white', padding: 40, borderRadius: 16, border: '1px solid #e5e7eb', width: 320 }}>
        <img src="/upek_logo.jpg" alt="Upek" style={{ width: '100%', marginBottom: 24, objectFit: 'contain' }} />
        <input
          type="password"
          placeholder="Salasana"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: 12, fontSize: 14 }}
        />
        {error && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>Väärä salasana</div>}
        <button onClick={login} style={{ width: '100%', padding: '10px', background: '#163b66', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 14 }}>
          Kirjaudu sisään
        </button>
      </div>
    </div>
  );
}