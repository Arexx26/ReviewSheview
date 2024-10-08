import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { mediaId, mediaType, rating, userId } = await req.json();

    // Create or update the media entry
    await prisma.media.upsert({
      where: { id: mediaId },
      update: {},
      create: {
        id: mediaId,
        title: '', // You might want to fetch the title from TMDB API
        type: mediaType,
      },
    });

    // Create or update the user's rating
    await prisma.rating.upsert({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },
      update: { value: rating },
      create: {
        value: rating,
        userId,
        mediaId,
      },
    });

    // Calculate and update the average rating for the media
    const averageRating = await prisma.rating.aggregate({
      where: { mediaId },
      _avg: { value: true },
    });

    await prisma.media.update({
      where: { id: mediaId },
      data: { averageRating: averageRating._avg?.value || 0 },
    });

    // Calculate and update group ratings
    const userGroups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
    });

    for (const group of userGroups) {
      const groupAverageRating = await prisma.rating.aggregate({
        where: {
          mediaId,
          user: {
            groups: {
              some: {
                id: group.id,
              },
            },
          },
        },
        _avg: { value: true },
      });

      await prisma.groupRating.upsert({
        where: {
          groupId_mediaId: {
            groupId: group.id,
            mediaId,
          },
        },
        update: { averageRating: groupAverageRating._avg?.value || 0 },
        create: {
          groupId: group.id,
          mediaId,
          averageRating: groupAverageRating._avg?.value || 0,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 });
  }
}