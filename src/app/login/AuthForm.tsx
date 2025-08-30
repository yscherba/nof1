"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { loginUser, registerUser, signInWithOAuth } from '../utils/facade';

export default function DashboardClientComponent() {
    const [email, setEmail] = useState("");
    const [action, setAction] = useState("login");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        if (action === 'login') {
            const loginResult = await loginUser(email, password);
            if (loginResult.error) {
                setError(loginResult.error || 'Login failed');
            }
            setSuccess(loginResult.success || 'Logged in successfully!');
            router.replace("/dashboard");
        } else if (action === 'register') {
            const registerResult = await registerUser(email, password);
            if (registerResult.error) {
                setError(registerResult.error || 'Registration failed');
            }
            setSuccess(registerResult.success || 'Registration initiated. Please check your email to confirm.');
        }
        setLoading(false);
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        signInWithOAuth({ provider });
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
                <button disabled={loading} type="submit" className="button w-full" onClick={(e) => {
                    e.preventDefault();
                    setAction('login');
                    handleSubmit(e);
                }}>
                    {loading ? "Signing In..." : "Log In"}
                </button>
                <button disabled={loading} type="submit" className="button w-full" onClick={(e) => {
                    e.preventDefault();
                    setAction('register');
                    handleSubmit(e);
                }}>
                    {loading ? "Signing Up..." : "Register"}
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
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </form>
        </div>
    );
}