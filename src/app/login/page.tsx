"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabaseClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

import '../../app/globals.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [action, setAction] = useState("login");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.replace("/dashboard");
            } else {
                router.replace("/login");
            }
        }
        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (action === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                setSuccess('Logged in successfully!');
                router.replace("/dashboard");
            } else if (action === 'register') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setSuccess('Registration successful! Please check your email to confirm.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    async function handleSocialLogin(provider: 'google' | 'facebook') {
        await supabase.auth.signInWithOAuth({ provider });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[600px] bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
                <input
                    type="email"
                    disabled={loading}
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="input"
                />
                <input
                    type="password"
                    disabled={loading}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="input"
                />
                <button disabled={loading} type="submit" className="button w-full" onClick={() => {
                    setAction('login');
                    handleSubmit(e);
                }}>
                    {loading ? 'Signing In...' : 'Log In'}
                </button>
                <button disabled={loading} type="submit" className="button w-full" onClick={() => {
                    setAction('register');
                    handleSubmit(e);
                }}>
                    {loading ? 'Signing Up...' : 'Register'}
                </button>
                <h3 className="text-center">OR</h3>
                <div className="flex flex-row gap-4 justify-center">
                    <button disabled={loading} type="button" onClick={() => handleSocialLogin('google')} className="button-icon">
                        <FontAwesomeIcon icon={faGoogle} size="2x" />
                    </button>
                    <button disabled={loading} type="button" onClick={() => handleSocialLogin('facebook')} className="button-icon facebook">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </button>
                </div>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
            </form>
        </div>
    );
}