"use client";
import { supabase } from "../utils/supabaseClient";

export default function Header() {
    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = "/login";
    }

    return (
        <header className="p-4 bg-gray-100 border-b flex justify-between items-center">
            <h1 className="text-xl font-bold">Header</h1>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </header>
    );
}
