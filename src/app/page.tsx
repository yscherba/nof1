"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./utils/supabaseClient";

export default function Home() {
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
        </div>
    );
}