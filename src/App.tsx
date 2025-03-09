import './App.css'
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import PopularMoviesList from './pages/PopularMoviesList';
import {MovieDetail} from './pages/MovieDetail';
import MoviesByGenre from './pages/Movies ByGenre';
import SearchPage from './pages/SearchPage';


function App() {
  
  return (
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
  )
}

export default App
