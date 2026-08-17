import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { User, Mail, Lock, ArrowRight, Loader2, Wheat } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/profile';

    const { userInfo } = useSelector((state) => state.auth);
    const [registerApi, { isLoading, error }] = useRegisterMutation();

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const res = await registerApi({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            console.error(err?.data?.message || err.error);
        }
    };

    return (
        <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#080b14] px-4 py-12">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-[#d4af37]/5 to-transparent"></div>
                <div className="absolute right-[10%] top-[10%] w-[40%] h-[40%] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none"></div>
            </div>

            <div className="relative z-10 w-full max-w-[420px]">
                {/* Logo area */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#080b14] mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                        <Wheat size={28} className="text-[#d4af37]" strokeWidth={1.4} />
                    </div>
                    <h2 className="font-serif text-3xl text-[#f8f9fa] mb-2">Create Account</h2>
                    <p className="text-[#e4e4e7]/70 text-sm">Join Makhana House today</p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-white/10 bg-[#080b14]/60 p-8 shadow-2xl backdrop-blur-xl relative">
                    {/* Error messages */}
                    {message && (
                        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center text-sm text-red-400">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center text-sm text-red-400">
                            {error?.data?.message || 'Failed to register'}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#d4af37]/60">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#d4af37]/50 focus:bg-white/10"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
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

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Password</label>
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
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#d4af37]/60">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#d4af37]/50 focus:bg-white/10"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3.5 text-sm font-semibold text-[#080b14] transition hover:bg-[#c39b2e] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    Create Account <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="mt-8 text-center text-sm text-[#e4e4e7]/70">
                    Already have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="font-semibold text-[#d4af37] hover:underline">
                        Sign In here
                    </Link>
                </p>
            </div>
        </section>
    );
}
