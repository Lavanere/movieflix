import { useState, useEffect } from 'react'
import styled from 'styled-components'
import MovieCard from './MovieCard';
import axios from 'axios'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  background-color: #222;
  color: white;
  padding: 1rem;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  margin-left: 1rem;
`;

const Section = styled.section`
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const MovieList = styled.div`
  display: flex;
  overflow-x: auto;
`;

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?api_key=60f360260558e4f8dec3d4f2d71085cb&language=pt-BR&sort_by=popularity.desc'
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=60f360260558e4f8dec3d4f2d71085cb&language=pt-BR'
        );
        setCategories(response.data.genres);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchMovies();
    fetchCategories();
  }, []);

  return (
    <Container>
      <Header>
        <h1>Netflix Clone</h1>
        <SearchInput type="text" placeholder="Pesquisar" />
      </Header>

      {categories.map((category) => (
        <Section key={category.id}>
          <Title>{category.name}</Title>
          <MovieList>
            {movies.filter((movie) => movie.genre_ids.includes(category.id)).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieList>
        </Section>
      ))}
    </Container>
  );
};

export default HomePage;