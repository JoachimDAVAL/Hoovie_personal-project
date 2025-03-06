import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
// import { useState, useEffect } from 'react'
import MoviesList from './pages/MoviesList'





function App() {

  return (
    <div className='App'>
      <Header />
      <MoviesList />

      <Footer />
    </div>
  )
}

export default App
