import { getLoggedInUser } from '../utils/facade';
import { redirect } from 'next/navigation';
import AuthForm  from './AuthForm'

export default async function Login() {
    const user = await getLoggedInUser();
    if (user) {
        redirect('/dashboard');
    }

    return (
        <AuthForm />
    );
}