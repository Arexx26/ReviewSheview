// Import the MovieDetails component from the components directory
import { MovieDetails } from "@/components/movie-details"

// This is the main page component for individual movie details
// It's using the App Router structure of Next.js

import HomePage from './HomePage/page';






export default function Page({ params }: { params?: { movieId: string } }) {
  // If there's a movieId in the params, show MovieDetails
  // Otherwise, show the HomePage
  if (params?.movieId) {
    return <MovieDetails movieId={parseInt(params.movieId, 10)} />
  }

  // If no movieId, render the HomePage
  return <HomePage />;
}