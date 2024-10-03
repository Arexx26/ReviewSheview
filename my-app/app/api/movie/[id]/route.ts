import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/config/api';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const apiKey = API_CONFIG.TMDB_API_KEY;
    const baseUrl = API_CONFIG.TMDB_BASE_URL;

    try {
        const movieResponse = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`, {
          headers: {
            'Accept': 'application/json',
          },
        });
    
        if (!movieResponse.ok) {
          const errorText = await movieResponse.text();
          throw new Error(`Movie details fetch failed: ${movieResponse.status} ${movieResponse.statusText}. ${errorText}`);
        }
    
        const movieData = await movieResponse.json();
    
        return NextResponse.json(movieData);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch movie details' },
            { status: 500 }
          );
        //return NextResponse.json({ error: error.message || 'Failed to fetch movie details' }, { status: 500 });
      }
    }