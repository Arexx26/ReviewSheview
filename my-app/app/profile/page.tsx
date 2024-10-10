import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
    const session = await getServerSession();

    if (!session) {
        redirect('/');
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {session.email}</p>
            {/* Add more profile information here */}
        </div>
    );
}