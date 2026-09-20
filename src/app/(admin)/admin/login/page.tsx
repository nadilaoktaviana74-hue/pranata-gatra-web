'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Logo } from '@/components/shared/logo';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || 'Invalid email or password credentials.');
        toast.error('Authentication failed. Please check your credentials.');
        return;
      }

      if (data.session) {
        toast.success('Login successful. Redirecting to admin dashboard...');
        router.push(redirectPath);
        router.refresh();
      }
    } catch {
      setErrorMessage('A system or network error occurred during sign-in.');
      toast.error('Unable to connect to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="gold-hero-glow -top-32 -left-32 opacity-30 pointer-events-none" />
      <div className="gold-hero-glow -bottom-32 -right-32 opacity-30 pointer-events-none" />

      {/* Back to Public Site Link */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white px-3.5 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#B38D46]" />
          <span>Back to Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10 py-12">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" showText={false} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Admin Console
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Pranata Gatra Management & Release Control Center
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl backdrop-blur-xl space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-3 text-rose-400 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#B38D46]" />
                <span>Admin Email</span>
              </label>
              <input
                type="email"
                required
                placeholder="admin@pranatagatra.my.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] focus:border-[#B38D46] transition-all placeholder:text-neutral-600"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B38D46]" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] focus:border-[#B38D46] transition-all placeholder:text-neutral-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-xl shadow-[#B38D46]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-800/80 text-center">
            <span className="text-[11px] text-neutral-500">
              Restricted access. Authorized Pranata Gatra administrators only.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#B38D46]" />
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
