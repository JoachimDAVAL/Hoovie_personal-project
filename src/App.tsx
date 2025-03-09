import './App.css'
import { Routes, Route } from 'react-router';
import { useState } from 'react';
import { IMovie } from './@types';
import Header from './components/Header';
import Footer from './components/Footer';
import PopularMoviesList from './pages/PopularMoviesList';
import MovieDetail from './pages/MovieDetail';
import MoviesByGenre from './pages/Movies ByGenre';
import SearchPage from './pages/SearchPage';





function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleSearchResults = (newMovies: IMovie[]) => {
    setMovies(newMovies);
  };
  return (
    <div className='App'>
      <Header query={query} setQuery={setQuery} onResults={handleSearchResults} />
      <main>
        <Routes>
          <Route path="/" element={<PopularMoviesList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movies/genre/:id" element={<MoviesByGenre />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
   
      </main>

      

      <Footer />
    </div>
  )
}

export default App
