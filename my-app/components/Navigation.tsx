'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav>
      <Link href="/">Home</Link>
      {/* Add other navigation links here */}
      {session ? (
        <>
          <span>Signed in as {session.user?.email}</span>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </nav>
  )
}