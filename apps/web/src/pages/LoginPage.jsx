import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes('not confirmed')) {
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email,
          });
          
          if (resendError) {
            throw new Error('Gagal mengirim ulang email verifikasi: ' + resendError.message);
          }
          throw new Error('Akun belum diverifikasi. Kami telah mengirim ulang link verifikasi ke email Anda. Silakan cek kotak masuk atau spam.');
        }
        throw new Error('Email atau password salah. Akses ditolak.');
      }

      // Login success
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col items-center justify-center p-4">
      {/* Back to home link */}
      <div className="absolute top-8 left-8">
        <Link to="/" className="border border-outline text-on-surface-variant p-2.5 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all duration-200 flex items-center justify-center gap-2 font-label-md">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Kembali
        </Link>
      </div>

      <div className="bg-surface border border-surface-variant rounded-2xl p-10 max-w-md w-full shadow-lg">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo MPK" className="h-16 w-auto mx-auto mb-6" />
          <h2 className="font-display-md text-headline-md font-bold text-on-surface mb-2">Login Pengurus</h2>
          <p className="font-body-md text-on-surface-variant">Login untuk akses panel dashboard</p>
        </div>

        {error && (
          <div className="bg-error/10 text-error font-body-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="email">Email</label>
            <input 
              required 
              id="email" 
              type="email" 
              className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest px-4 py-2.5"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="password">Password</label>
            <input 
              required 
              id="password" 
              type="password" 
              className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest px-4 py-2.5"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-primary text-on-primary font-label-md text-label-md uppercase py-3 rounded-lg hover:shadow-md hover:opacity-90 transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2">
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                Memproses...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
