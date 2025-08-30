"use client";
import { signOut } from '../utils/facade';

export default function Header() {
    async function handleLogout() {
        const result = await signOut();
        if (result) window.location.href = "/login";
    }

    return (
        <header className="border-b border-gray-300 px-4 py-6">
            <div className="container">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Logo</h1>
                    <button onClick={handleLogout} className="button">Logout</button>
                </div>
            </div>
        </header>
    );
}
