'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export function AppLayout({ children }: { children: ReactNode }) {
	const { user, signIn, signOut } = useAuth();

	return (
		<div>
			<nav>
				<Link href="/">Home</Link>
				{user ? (
					<>
						<Link href="/profile">Profile</Link>
						<button onClick={signOut}>Sign Out</button>
					</>
				) : (
					<button onClick={signIn}>Sign In</button>
				)}
			</nav>
			<main>{children}</main>
		</div>
	);
}