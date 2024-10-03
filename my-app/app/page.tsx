// Import the MovieDetails component from the components directory
import { MovieDetails } from "@/components/movie-details"

// This is the main page component for individual movie details
// It's using the App Router structure of Next.js
export default function Page({ params }: { params: { movieId: string } }) {
  // The component receives a 'params' prop from Next.js routing
  // 'params' contains route parameters, in this case, 'movieId'

  return (
    // Render the MovieDetails component
    // Convert the movieId from a string to an integer
    // The '10' in parseInt specifies base 10 (decimal) numbering system
    <MovieDetails movieId={parseInt(params.movieId, 10)} />
  )
}