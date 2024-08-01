import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 200px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

const MovieTitle = styled.h3`
  margin: 10px 0;
`;

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <CardContainer>
        <MovieImage
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <MovieTitle>{movie.title}</MovieTitle>
      </CardContainer>
    </Link>
  );
};

export default MovieCard;