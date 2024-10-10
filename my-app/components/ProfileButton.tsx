'use client'

import { useAuth } from '@/hooks/useAuth';

export default function ProfileButton() {
  const { user, signIn, signOut } = useAuth();

  if (user) {
    return (
      <>
        Signed in as {user.email} <br />
        <button onClick={signOut}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={signIn}>Sign in</button>
    </>
  )
}