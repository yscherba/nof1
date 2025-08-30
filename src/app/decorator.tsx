import { redirect } from 'next/navigation';
import { createClient } from './utils/supabase/server';

export default async function RootLayout({ children }) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
