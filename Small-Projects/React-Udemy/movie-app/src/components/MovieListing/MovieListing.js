import React from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies } from '../../features/movies/movieSlice'

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  let renderMovies = "";

  renderMovies = 
  movies.Response === 'True' ? 
  () 
  : (<div className="movies-error"><h3>{movies.Error}</h3></div>);
  
  return (
    <div>
      MovieListing
    </div>
  )
}

export default MovieListing
