"use client";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

import '../../app/globals.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setError(error?.message || null);
    }

    async function handleSocialLogin(provider: 'google' | 'facebook') {
        await supabase.auth.signInWithOAuth({ provider });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-6 w-full max-w-[600px] bg-white p-8 rounded-lg shadow-lg"
            >
                <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="button"
                >
                    Login with Email & Password
                </button>
                <h3 className="text-center">OR</h3>
                <div className="flex flex-row gap-4 justify-center">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        className="button-icon">
                        <FontAwesomeIcon icon={faGoogle} size="2x" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('facebook')}
                        className="button-icon facebook"
                    >
                        <FontAwesomeIcon icon={faFacebookF} size="2x" />
                    </button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
}