import { NextResponse } from 'next/server';
import { adminAuth, adminFirestore } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    const { mediaId, rating } = await req.json();

    const mediaRef = adminFirestore.collection('media').doc(mediaId.toString());
    const mediaDoc = await mediaRef.get();

    if (!mediaDoc.exists) {
      await mediaRef.set({
        id: mediaId,
        title: "",
        type: "movie",
      });
    }

    const ratingRef = adminFirestore.collection('ratings').doc(`${userId}_${mediaId}`);
    await ratingRef.set({
      userId,
      mediaId,
      value: rating,
      createdAt: new Date().toISOString(),
    }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json({ error: 'Error submitting rating' }, { status: 500 });
  }
}