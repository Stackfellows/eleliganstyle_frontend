'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function UserLoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMsg('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail || email, role: 'user' }),
      });
      const data = await res.json();
      setResetLoading(false);
      if (data.success) {
        setResetMsg(`Verification code sent to ${resetEmail || email}! Check your inbox.`);
      } else {
        setResetMsg(data.message || 'Failed to send reset code.');
      }
    } catch (err) {
      setResetLoading(false);
      setResetMsg('Network error sending reset email.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(isRegister ? 'Account Created Successfully!' : 'Welcome Back!');
      localStorage.setItem(
        'elegant_user_session',
        JSON.stringify({
          name: fullName || 'Hélène Vaneau',
          email: email || 'helene.vaneau@paris.fr',
          tier: 'VIP Customer',
          id: `ES-${Math.floor(10000 + Math.random() * 90000)}`
        })
      );
      setTimeout(() => {
        router.push('/account');
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F4EFEB] flex flex-col items-center justify-start pt-0 pb-16 px-4 relative overflow-hidden font-sans select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E9C9CE]/25 rounded-full blur-3xl pointer-events-none" />

      {/* TOP STORE NAVIGATION BAR */}
      <div className="w-full max-w-lg pt-6 flex justify-between items-center z-20">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-widest text-[#171515] hover:text-[#C58C97] transition-colors flex items-center gap-1.5"
        >
          ← Back to Store
        </Link>
        <span className="text-[11px] font-bold tracking-widest text-[#171515] uppercase flex items-center gap-1">
          <ShoppingBag className="w-3.5 h-3.5 text-[#C58C97]" />
          ELEGANTSTYLE MAISON
        </span>
      </div>

      {/* LANYARD STRAP (DORI) + HANGING ID BADGE CONTAINER */}
      <div className="relative flex flex-col items-center mt-0 z-10 w-full max-w-md">
        {/* Lanyard Top Anchor / Ceiling Mount */}
        <div className="w-16 h-3 bg-[#171515] rounded-b-md shadow-md"></div>

        {/* Lanyard Strap / Dori (Hanging from top) */}
        <div className="relative flex justify-center items-center w-full">
          {/* Dual Fabric Straps meeting in V-shape */}
          <div className="relative w-8 h-28 flex justify-center">
            {/* Left Strap */}
            <div className="absolute top-0 w-3 h-28 bg-gradient-to-b from-[#1C1A1B] via-[#2A2426] to-[#1C1A1B] shadow-inner border-x border-[#3A3234]/40 flex flex-col items-center justify-around overflow-hidden">
              <span className="text-[6px] font-bold tracking-widest text-[#FFFFFF] uppercase rotate-90 whitespace-nowrap">
                ELEGANTSTYLE
              </span>
            </div>
            {/* Right Strap */}
            <div className="absolute top-0 w-3 h-28 bg-gradient-to-b from-[#2A2426] via-[#1C1A1B] to-[#2A2426] shadow-inner border-x border-[#3A3234]/40 flex flex-col items-center justify-around overflow-hidden ml-3">
              <span className="text-[6px] font-bold tracking-widest text-[#FFFFFF] uppercase rotate-90 whitespace-nowrap">
                STORE MEMBER
              </span>
            </div>
          </div>
        </div>

        {/* SWINGING ID CARD ASSEMBLY WITH PENDULUM ANIMATION */}
        <div
          className="relative flex flex-col items-center w-full"
          style={{
            transformOrigin: 'top center',
            animation: 'gentleBadgeSway 6s ease-in-out infinite alternate',
          }}
        >
          {/* Metal Swivel Clasp / Clip Connecting Lanyard to Card */}
          <div className="flex flex-col items-center -mt-1 z-20">
            {/* Chrome/Rose-gold Hook Top Ring */}
            <div className="w-5 h-5 rounded-full border-[3px] border-[#9E6E77] shadow-sm bg-gradient-to-br from-[#E2B9C0] to-[#8A5A62]" />
            {/* Metal Swivel Body */}
            <div className="w-3.5 h-4 bg-gradient-to-b from-[#E2B9C0] via-[#FFFFFF] to-[#8A5A62] shadow-sm -mt-1 rounded-sm" />
            {/* Lobster Claw Clip Clamp */}
            <div className="w-7 h-3 bg-gradient-to-r from-[#8A5A62] via-[#E2B9C0] to-[#8A5A62] rounded-t-md shadow-md border border-[#FFFFFF]/60 -mt-0.5" />
          </div>

          {/* Transparent Badge Holder Top Grip with Slot Punch */}
          <div className="w-24 h-6 bg-white/80 backdrop-blur-md rounded-t-xl border-t border-x border-[#D8CECC] shadow-sm flex items-center justify-center -mt-1 z-10">
            {/* Punch hole in ID Card */}
            <div className="w-9 h-2 bg-[#171515] rounded-full border border-[#D8CECC] shadow-inner" />
          </div>

          {/* THE WHITE E-COMMERCE LOGIN CARD */}
          <div className="w-full bg-[#FFFFFF] text-[#171515] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-[#E2DBD9] overflow-hidden -mt-1 relative">
            {/* Store Top Card Header */}
            <div className="bg-[#171515] text-[#FCFAF9] px-6 py-4 flex items-center justify-between border-b border-[#2D282A]">
              <div className="flex flex-col text-left">
                <span className="font-serif text-base tracking-[0.25em] font-medium uppercase text-[#FFFFFF]">
                  ELEGANTSTYLE
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#E9C9CE]">
                  CUSTOMER ACCOUNT PORTAL
                </span>
              </div>

              {/* Store Icon Graphic */}
              <div className="w-8 h-8 rounded-full bg-[#2A2426] border border-[#3D3537] flex items-center justify-center text-[#E9C9CE]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>

            {/* Success Message Banner */}
            {successMsg && (
              <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 p-3.5 text-center text-xs flex items-center justify-center gap-1.5 animate-in fade-in font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Card Content & Form */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Heading */}
              <div className="text-left border-b border-[#F2ECEB] pb-4">
                <h2 className="font-serif text-xl font-bold text-[#171515]">
                  {isRegister ? 'Create Customer Account' : 'Sign In to Your Account'}
                </h2>
                <p className="text-xs font-normal text-[#575052] mt-1">
                  {isRegister
                    ? 'Register now to track orders, save wishlist items & get exclusive deals.'
                    : 'Enter your account details below to access your order history.'}
                </p>
              </div>

              {/* Login / Register Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {isRegister && (
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#171515] font-bold block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#171515] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ayesha Khan"
                        className="w-full bg-[#FCFAF9] border border-[#C8BFBD] focus:border-[#171515] text-xs font-medium text-[#171515] placeholder-[#8A8183] pl-10 pr-3 py-3 rounded-lg focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#171515] font-bold block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#171515] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full bg-[#FCFAF9] border border-[#C8BFBD] focus:border-[#171515] text-xs font-medium text-[#171515] placeholder-[#8A8183] pl-10 pr-3 py-3 rounded-lg focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase tracking-wider text-[#171515] font-bold">
                      Password
                    </label>
                    {!isRegister && (
                      <button
                        type="button"
                        onClick={() => {
                          setResetEmail(email);
                          setShowForgotModal(true);
                        }}
                        className="text-xs font-bold text-[#A21D21] hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#171515] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#FCFAF9] border border-[#C8BFBD] focus:border-[#171515] text-xs font-medium text-[#171515] placeholder-[#8A8183] pl-10 pr-10 py-3 rounded-lg focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#171515] hover:text-[#C58C97]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#171515] hover:bg-[#2A2426] text-[#FCFAF9] font-bold text-xs uppercase tracking-[0.2em] py-3.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 mt-3"
                >
                  {loading ? (
                    <span className="font-semibold text-xs">Signing In...</span>
                  ) : (
                    <>
                      <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Card Footer / Toggle */}
              <div className="pt-4 border-t border-[#F2ECEB] flex items-center justify-between">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-normal text-[#575052]">
                    {isRegister ? 'Already have an account?' : "Don't have an account yet?"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(!isRegister);
                      setSuccessMsg('');
                    }}
                    className="text-xs font-bold text-[#A21D21] hover:underline cursor-pointer text-left mt-0.5"
                  >
                    {isRegister ? 'Sign In Here' : 'Create New Account →'}
                  </button>
                </div>

                {/* Simulated E-Commerce Barcode */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-[2px] h-6">
                    {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3].map((w, i) => (
                      <div key={i} className="bg-[#171515] h-full" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-widest text-[#171515] mt-0.5">
                    STORE-MEMBER
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-1.5 w-full bg-[#171515]" />
          </div>
        </div>
      </div>

      {/* PASSWORD RESET OTP MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#ECE5E3] rounded-2xl p-6 max-w-sm w-full text-left shadow-2xl space-y-4 animate-in fade-in">
            <h3 className="font-serif text-base text-[#171515] font-bold">
              Reset Your Password
            </h3>
            <p className="text-xs text-[#575052] font-normal">
              Enter your registered email address below. We will send a 6-digit verification code to your inbox via Nodemailer.
            </p>

            {resetMsg && (
              <div className="p-3 bg-[#FCFAF9] border border-[#C58C97]/40 rounded-lg text-xs text-[#A21D21] font-bold">
                {resetMsg}
              </div>
            )}

            <form onSubmit={handlePasswordReset} className="space-y-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#171515] font-bold block mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#FCFAF9] border border-[#C8BFBD] focus:border-[#171515] text-xs font-medium text-[#171515] p-2.5 rounded-lg outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetMsg('');
                  }}
                  className="w-1/2 py-2.5 text-xs font-semibold border border-[#E2DBD9] rounded-lg text-[#575052] hover:bg-[#FCFAF9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-1/2 py-2.5 text-xs bg-[#171515] text-[#FCFAF9] rounded-lg font-bold hover:bg-[#2F292B] disabled:opacity-50"
                >
                  {resetLoading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hanging Badge Physics Sway Keyframes */}
      <style jsx>{`
        @keyframes gentleBadgeSway {
          0% {
            transform: rotate(-2.2deg) translateY(0px);
          }
          50% {
            transform: rotate(0.8deg) translateY(2px);
          }
          100% {
            transform: rotate(2.2deg) translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
