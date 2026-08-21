import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { Mail, Lock, ArrowRight, Loader2, Wheat } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/profile';

    const { userInfo } = useSelector((state) => state.auth);
    const [login, { isLoading, error }] = useLoginMutation();

    useEffect(() => {
        if (userInfo) {
            if (userInfo.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate(redirect);
            }
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            if (res.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate(redirect);
            }
        } catch (err) {
            console.error(err?.data?.message || err.error);
        }
    };

    return (
        <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#080b14] px-4 py-12">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-[#d4af37]/5 to-transparent"></div>
                <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none"></div>
                <div className="absolute -right-[20%] bottom-[10%] w-[40%] h-[40%] rounded-full bg-[#d4af37]/5 blur-[100px] pointer-events-none"></div>
            </div>

            <div className="relative z-10 w-full max-w-[420px]">
                {/* Logo area */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#080b14] mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                        <Wheat size={28} className="text-[#d4af37]" strokeWidth={1.4} />
                    </div>
                    <h2 className="font-serif text-3xl text-[#f8f9fa] mb-2">Welcome Back</h2>
                    <p className="text-[#e4e4e7]/70 text-sm">Sign in to your Makhana House account</p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-white/10 bg-[#080b14]/60 p-8 shadow-2xl backdrop-blur-xl relative">
                    {/* Error message */}
                    {error && (
                        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center text-sm text-red-400">
                            {error?.data?.message || 'Invalid email or password'}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#d4af37]/60">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#d4af37]/50 focus:bg-white/10"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[13px] font-medium text-[#f8f9fa]/80">Password</label>
                                <Link to="/forgot-password" className="text-[12px] text-[#d4af37] hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#d4af37]/60">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#d4af37]/50 focus:bg-white/10"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3.5 text-sm font-semibold text-[#080b14] transition hover:bg-[#c39b2e] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="mt-8 text-center text-sm text-[#e4e4e7]/70">
                    Don't have an account?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-semibold text-[#d4af37] hover:underline">
                        Create one here
                    </Link>
                </p>
            </div>
        </section>
    );
}
