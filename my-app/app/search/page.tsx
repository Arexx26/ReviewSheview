'use client'; 
// This line indicates that this is a Client Component in Next.js
// Client Components can use state, effects, and browser-only APIs

// Importing necessary functions and components
import { useState } from 'react';
// useState is a React Hook used for adding state to functional components
// It's essential for managing the component's dynamic data (query, results, loading, error)

import { searchMedia } from '../../services/movieService';
// searchMedia is a custom function imported from our movie service
// It's responsible for making the actual API call to search for movies and TV shows
// This separation of concerns keeps our component clean and the API logic reusable

import Link from 'next/link';
// Link is a Next.js component used for client-side navigation
// It's used here to create clickable links to individual movie/show pages
// Link prefetches the linked page in the background, making navigation feel instant
import Image from 'next/image'; // Import Next.js Image component for optimized image loading


// Defining the structure of a search result item
interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    media_type: 'movie' | 'tv';
    release_date?: string; // For movies
    first_air_date?: string; // For TV shows
    poster_path: string | null; // Path to the poster image
  }

// Main component for the search page
export default function SearchPage() {
  // State variables to manage the component's data and UI
  const [query, setQuery] = useState(''); // Stores the search query
  const [results, setResults] = useState([]); // Stores the search results
  const [loading, setLoading] = useState(false); // Indicates if a search is in progress
  const [error, setError] = useState<string | null>(null); // Stores any error messages

  // Function to handle the search form submission
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    if (!query.trim()) return; // Don't search if the query is empty

    setLoading(true); // Start loading
    setError(null); // Clear any previous errors

    try {
      // Perform the search using the imported searchMedia function
      const data = await searchMedia(query);
      setResults(data.results); // Update the results state with the search results
    } catch (err) {
      // Handle any errors that occur during the search
      setError('Failed to search media. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false); // Stop loading, regardless of success or failure
    }
  };

  // Function to get the year from a date string
  const getYear = (dateString?: string) => {
    return dateString ? new Date(dateString).getFullYear() : 'N/A';
  };

  // The component's UI
  return (
    <div>
      <h1>Search For Your Favorite Movies and TV Shows</h1>
      {/* Search form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie or TV show title"
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}
      {/* Error message display */}
      {error && <p>Error: {error}</p>}

      {/* Display search results if available */}
      {results.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((item: SearchResult) => (
            <li key={item.id} className="border p-4 rounded-lg">
              <Link href={`/movie/${item.id}`} className="flex items-center space-x-4">
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  {item.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={item.title || item.name || 'Movie poster'}
                      width={92}
                      height={138}
                      className="rounded"
                    />
                  ) : (
                    <div className="w-[92px] h-[138px] bg-gray-200 flex items-center justify-center rounded">
                      No Image
                    </div>
                  )}
                </div>
                {/* Title and details */}
                <div>
                  <h3 className="font-bold">
                    {item.title || item.name}{' '}
                    ({getYear(item.release_date || item.first_air_date)})
                  </h3>
                  <p>{item.media_type === 'movie' ? 'Movie' : 'TV Show'}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}