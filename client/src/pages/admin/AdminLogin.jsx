import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLoginMutation } from '../../store/api/authApiSlice';
import { setCredentials } from '../../store/slices/authSlice';
import { Mail, Lock, ArrowRight, Loader2, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/dashboard';

    const { userInfo } = useSelector((state) => state.auth);
    const [adminLogin, { isLoading, error }] = useAdminLoginMutation();

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            navigate(redirect);
        } else if (userInfo && userInfo.role !== 'admin') {
            navigate('/');
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await adminLogin({ email, password }).unwrap();
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
                <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] rounded-full bg-cyan-400/5 blur-[120px] pointer-events-none"></div>
                <div className="absolute -right-[20%] bottom-[10%] w-[40%] h-[40%] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none"></div>
            </div>

            <div className="relative z-10 w-full max-w-[420px]">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/50 bg-[#080b14] mb-4 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                        <ShieldAlert size={28} className="text-cyan-400" strokeWidth={1.4} />
                    </div>
                    <h2 className="font-serif text-3xl text-[#f8f9fa] mb-2">Admin Portal</h2>
                    <p className="text-[#e4e4e7]/70 text-sm">Sign in to the Makhana House Admin Panel</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#080b14]/60 p-8 shadow-2xl backdrop-blur-xl relative">
                    {error && (
                        <div className="mb-4 rounded-lg bg-cyan-400/10 border border-cyan-400/20 p-3 text-center text-sm text-red-400">
                            {error?.data?.message || 'Invalid email or password'}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
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

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[13px] font-medium text-[#f8f9fa]/80">Password</label>
                            </div>
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
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 text-sm font-semibold text-[#080b14] transition hover:bg-cyan-500 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    Secure Sign In <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                {/* Footer link */}
                <p className="mt-8 text-center text-sm text-[#e4e4e7]/70">
                    Need to create an admin account?{' '}
                    <Link to={redirect ? `/admin/register?redirect=${redirect}` : '/admin/register'} className="font-semibold text-cyan-400 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </section>
    );
}
