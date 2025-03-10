import './App.css'
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import PopularMoviesList from './pages/PopularMoviesList';
import {MovieDetail} from './pages/MovieDetail';
import MoviesByGenre from './pages/Movies ByGenre';
import { SearchProvider } from './contexts/SearchContext';
import SearchPage from './pages/SearchPage';


function App() {
  
  return (
    <SearchProvider>
      <div className='App'>
        <Header />
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
    </SearchProvider>

  )
}

export default App
