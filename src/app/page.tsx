import { getLoggedInUser } from './utils/facade';
import { redirect } from 'next/navigation';
import MainPageClient from './MainPageClient';

export default async function Home() {
    const user = await getLoggedInUser();
    if (user) {
        redirect('/dashboard');
    } else {
        redirect('/login');
    }

    return (
        <MainPageClient />
    );
}