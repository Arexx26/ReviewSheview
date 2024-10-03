import Link from 'next/link';
interface SearchResultsProps {
    results: any[]; // Replace 'any' with the correct type for your results
  }


const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <ul>
      {results.map((movie) => (
        <li key={movie.imdbID} className="mb-4">
          <Link href={`/movie/${movie.imdbID}`}>
            <div className="flex items-center">
              <img src={movie.Poster} alt={movie.Title} className="w-16 h-auto mr-4" />
              <div>
                <h3 className="font-bold">{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};