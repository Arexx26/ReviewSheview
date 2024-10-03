'use client';

import { useState } from 'react';
import { searchMedia } from '../../services/movieService';
import Link from 'next/link';

interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    media_type: 'movie' | 'tv';
  }


export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchMedia(query);
      setResults(data.results);
    } catch (err) {
      setError('Failed to search media. Please try again.' as string | null);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Media</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie or TV show title"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {results.length > 0 && (
        <ul>
          {results.map((item: SearchResult) => (
            <li key={item.id}>
              <Link href={`/movie/${item.id}`}>
                {item.title || item.name}
              </Link>
              {' - '}
              {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}