"use client";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import '../styles/globals.css';

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
                    className="input-base"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="input-base"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login with Email & Password
                </button>
                <h3 className="text-center">OR</h3>
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Login with Google
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('facebook')}
                        className="bg-blue-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-900 transition"
                    >
                        Login with Facebook
                    </button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
}