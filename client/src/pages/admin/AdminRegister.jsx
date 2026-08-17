import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminRegisterMutation } from '../../store/api/authApiSlice';
import { setCredentials } from '../../store/slices/authSlice';
import { User, Mail, Lock, ArrowRight, Loader2, ShieldCheck, Key } from 'lucide-react';

export default function AdminRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adminSecret, setAdminSecret] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/dashboard';

    const { userInfo } = useSelector((state) => state.auth);
    const [adminRegister, { isLoading, error }] = useAdminRegisterMutation();

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            navigate(redirect);
        } else if (userInfo && userInfo.role !== 'admin') {
            navigate('/');
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
            const res = await adminRegister({ name, email, password, adminSecret }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            console.error(err?.data?.message || err.error);
        }
    };

    return (
        <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#080b14] px-4 py-12">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-cyan-400/5 to-transparent"></div>
                <div className="absolute right-[10%] top-[10%] w-[40%] h-[40%] rounded-full bg-cyan-400/5 blur-[120px] pointer-events-none"></div>
            </div>

            <div className="relative z-10 w-full max-w-[420px]">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/50 bg-[#080b14] mb-4 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                        <ShieldCheck size={28} className="text-cyan-400" strokeWidth={1.4} />
                    </div>
                    <h2 className="font-serif text-3xl text-[#f8f9fa] mb-2">Admin Registration</h2>
                    <p className="text-[#e4e4e7]/70 text-sm">Create a new administrator account</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#080b14]/60 p-8 shadow-2xl backdrop-blur-xl relative">
                    {message && (
                        <div className="mb-4 rounded-lg bg-cyan-400/10 border border-cyan-400/20 p-3 text-center text-sm text-red-400">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 rounded-lg bg-cyan-400/10 border border-cyan-400/20 p-3 text-center text-sm text-red-400">
                            {error?.data?.message || 'Failed to register'}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#f8f9fa]/80 ml-1">Admin Secret Key <span className="text-cyan-400">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                                    <Key size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={adminSecret}
                                    onChange={(e) => setAdminSecret(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                                    placeholder="Enter the secret admin key"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 text-sm font-semibold text-[#080b14] transition hover:bg-cyan-500 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    Create Admin <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                {/* Footer link */}
                <p className="mt-8 text-center text-sm text-[#e4e4e7]/70">
                    Already an admin?{' '}
                    <Link to={redirect ? `/admin/login?redirect=${redirect}` : '/admin/login'} className="font-semibold text-cyan-400 hover:underline">
                        Sign In here
                    </Link>
                </p>
            </div>
        </section>
    );
}
