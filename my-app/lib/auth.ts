import { adminAuth } from './firebaseAdmin';
import { cookies } from 'next/headers';

export async function getServerSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(session, true);
    return decodedClaims;
  } catch (error) {
    return null;
  }
}