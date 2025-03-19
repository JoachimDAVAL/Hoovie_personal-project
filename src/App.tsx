import './App.css'
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import PopularMoviesList from './pages/PopularMoviesList';
import {MovieDetail} from './pages/MovieDetail';
import MoviesByGenre from './pages/Movies ByGenre';
import { SearchProvider } from './contexts/SearchContext';
import SearchPage from './pages/SearchPage';
import { MovieFilterProvider } from './contexts/FilterAndSortByContext';


function App() {
  
  return (
    <MovieFilterProvider>
    <SearchProvider>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MoviesByGenre />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            {/* <Route path="/movies/genre" element={<MoviesByGenre />} /> */}
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SearchProvider>
    </MovieFilterProvider>
  )
}

export default App
