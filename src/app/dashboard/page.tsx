import { getLoggedInUser } from '../utils/facade';
import { redirect } from 'next/navigation';
import AuthDashboardClientComponent from './DashboardClientComponent'

export default async function Dashboard() {
    const user = await getLoggedInUser();
    if (!user) {
        redirect('/login');
    }

    return (
        <AuthDashboardClientComponent />
    );
}