import './App.css'
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesList from './pages/MoviesList';
import MovieDetail from './pages/MovieDetail';
import MoviesByGenre from './pages/Movies ByGenre';





function App() {

  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movies/genre/:id" element={<MoviesByGenre />} />
        </Routes>
   
      </main>

      

      <Footer />
    </div>
  )
}

export default App
