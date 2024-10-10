'use client'

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export function Navigation() {
  const { user, signIn, signOut } = useAuth();

  return (
    <nav>
      <Link href="/">Home</Link>
      {/* Add other navigation links here */}
      {user ? (
        <>
          <span>Signed in as {user.email}</span>
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <button onClick={signIn}>Sign in</button>
      )}
    </nav>
  )
}