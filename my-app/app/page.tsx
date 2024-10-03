import { MovieDetails } from "@/components/movie-details"



export default function Page({ params }: { params: { movieId: string } }) {
  return <MovieDetails movieId={parseInt(params.movieId, 10)} />
}
