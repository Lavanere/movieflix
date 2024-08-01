import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const MovieImage = styled.img`
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const MovieTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Overview = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: justify;
`;

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_API_KEY&language=pt-BR`
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <MovieImage
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <MovieTitle>{movie.title}</MovieTitle>
      <Overview>{movie.overview}</Overview>
      {/* ... outros detalhes */}
    </Container>
  );
};

export default MovieDetails;