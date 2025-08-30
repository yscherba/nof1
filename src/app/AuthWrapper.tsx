"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSession } from './utils/facade';

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const isSession = await getSession();
      const publicPaths = ['/login', '/'];
      const isPublicPath = publicPaths.includes(router.pathname);

      if (!isSession && !isPublicPath) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}