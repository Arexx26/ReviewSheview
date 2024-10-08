import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { mediaId: rawMediaId, rating } = await req.json();
  const mediaId = parseInt(rawMediaId, 10);

  try {
    // First, try to find the media
    let media = await prisma.media.findUnique({
      where: { id: mediaId },
    });

    // If media doesn't exist, create it
    if (!media) {
      media = await prisma.media.create({
        data: {
          id: mediaId,
          title: "", // You might want to fetch the title from an external API
          type: "movie", // Adjust as needed
        },
      });
    }

    // Now upsert the rating
    const upsertedRating = await prisma.rating.upsert({
      where: {
        userId_mediaId: {
          userId: session.user.id,
          mediaId: media.id,
        },
      },
      update: {
        value: rating,
      },
      create: {
        userId: session.user.id,
        mediaId: media.id,
        value: rating,
      },
    });

    return NextResponse.json(upsertedRating);
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json({ error: 'Error submitting rating' }, { status: 500 });
  }
}