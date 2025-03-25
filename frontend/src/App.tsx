import React from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import {MovieDetail} from './pages/MovieDetail';
import MoviesByGenre from './pages/Movies ByGenre';
import { SearchProvider } from './contexts/SearchContext';
import SearchPage from './pages/SearchPage';
import { MovieFilterProvider } from './contexts/FilterAndSortByContext';
// import PopularMoviesList from './pages/PopularMoviesList';
import ErrorBoundary from './errorBoundary';


function App() {
  
  return (
    <MovieFilterProvider>
    <SearchProvider>
      <div className='App'>
      <ErrorBoundary>
        <Header />
        </ErrorBoundary>
        <main className='w-full'>
          <Routes>
            {/* <Route path="/" element={<PopularMoviesList />} /> */}
            <Route path="/" element={<MoviesByGenre />} />
            
            <Route path="/movie/:id" element={<ErrorBoundary><MovieDetail /></ErrorBoundary>} />
            
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
