'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@elegantstyle.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email.trim() && password.trim()) {
        localStorage.setItem('elegant_admin_authenticated', 'true');
        router.push('/admin');
      } else {
        setError('Please enter valid administrator credentials.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0D0C0C] flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C58C97]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C58C97]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#141213] border border-[#242022] p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Brand Badge */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#262123] border border-[#3A3134] text-[#E9C9CE] text-[10px] tracking-[0.25em] uppercase font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E9C9CE]" />
            <span>Maison Security Portal</span>
          </div>
          <h1 className="font-serif text-3xl font-light text-[#FFFFFF] tracking-[0.15em] uppercase">
            ELEGANTSTYLE
          </h1>
          <p className="text-xs text-[#9E9597] font-light">
            Enter authorized administrator credentials to manage store catalog, client orders & privileges.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-[#2E181A] border border-[#522326] text-[#E87373] text-xs rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] uppercase tracking-widest text-[#B0A7A9] font-medium block">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6B6466] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@elegantstyle.com"
                className="w-full bg-[#1A1718] border border-[#2B2527] focus:border-[#E9C9CE] focus:outline-none text-xs text-[#FCFAF9] pl-10 pr-4 py-3 rounded transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="flex justify-between items-center">
              <label className="text-[11px] uppercase tracking-widest text-[#B0A7A9] font-medium">
                Password
              </label>
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  setError('');
                  try {
                    const res = await fetch('/api/auth/reset-password', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: email || 'maazarshad89@gmail.com', role: 'admin' }),
                    });
                    const data = await res.json();
                    setLoading(false);
                    if (data.success) {
                      setError(`🔑 Reset Passkey code sent to ${email || 'maazarshad89@gmail.com'} via Nodemailer!`);
                    } else {
                      setError('Failed to dispatch admin passkey reset email.');
                    }
                  } catch (err) {
                    setLoading(false);
                    setError('Network error sending admin passkey reset.');
                  }
                }}
                className="text-[10px] text-[#E9C9CE] hover:underline cursor-pointer"
              >
                Reset Admin Passkey?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6B6466] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1A1718] border border-[#2B2527] focus:border-[#E9C9CE] focus:outline-none text-xs text-[#FCFAF9] pl-10 pr-4 py-3 rounded transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-medium text-xs uppercase tracking-[0.2em] py-3.5 px-4 rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 mt-4"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#242022] text-center text-[10px] text-[#7A7375] space-y-1">
          <p>© 2026 ELEGANTSTYLE Maison Administrator System</p>
        </div>
      </div>
    </div>
  );
}
