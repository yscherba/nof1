"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from './utils/facade';

export default function Home() {
    // const router = useRouter();
    //     useEffect(() => {
    //     async function checkAuth() {
    //         const isSession = await getSession();
    //         if (isSession) {
    //             router.replace("/dashboard");
    //         } else {
    //             router.replace("/login");
    //         }
    //     }
    //     checkAuth();
    // }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
        </div>
    );
}