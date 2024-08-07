import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import movieApi from "../../common/API/movieApi"
import { APIkey } from '../../common/API/MovieApiKey'
import { useDispatch } from 'react-redux'
import { addMovies } from '../../features/movies/movieSlice'

const Home = () => {

  const movieText = "Harry";
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await movieApi.get(
        `?apiKey=${APIkey}&s=${movieText}&type=movie`
        ).catch((e) => {
          console.log(e);
        });
        dispatch(addMovies(response.data));
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className='banner-img'> </div>
      <MovieListing />
    </>
  )
}

export default Home
