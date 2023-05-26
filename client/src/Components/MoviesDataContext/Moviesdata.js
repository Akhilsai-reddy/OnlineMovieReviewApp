import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useDispatch} from "react-redux";
import MoviesApi from "../Data/MoviesApi";
import { movieActions } from "../Redux/MovieSlice";

export const movieContext = createContext();

const MoviesContextData = (props) => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState([]);

 const dispatch=useDispatch();
  useEffect(() => {

    // MoviesApi.getAllMoviesList((data) => setMovies(data)).then((data) =>
    //   setFilter(data)
    // );

  /*using redux-toolkit*/
    MoviesApi.getAllMoviesList((data)=>dispatch(movieActions.getAllMovies(data))).then((data) =>
    setFilter(data))
  }, [dispatch]);
  const addMovieHandler = (newMovie) => {
    const updatedMovies = [...movies, newMovie];
    const sortedData=updatedMovies.sort((a,b)=>b.createdAt-a.createdAt)
    setMovies(sortedData);
  };
  const deleteMovieById = (id) => {
    setMovies(movies.filter((item) => item._id !== id));
  };

  const searchHandler = (data) => {
    if (data) {
      setMovies(
        filter.filter(
          (movie) =>
            movie.movieName.toLowerCase().includes(data.toLowerCase()) ||
            movie.details.toLowerCase().includes(data.toLowerCase()) ||
            movie.Director.toLowerCase().includes(data.toLowerCase())
        )
      );
    }
  };

  return (
    <movieContext.Provider
      value={{
        ...movies,
        movies,
        addNewMovie: (data) => addMovieHandler(data),
        deleteMovie: (id) => deleteMovieById(id),
        // addReview:((id,data)=>setMovies()),
        getSearchedData: (data) => searchHandler(data),
      }}
    >
      {props.children}
    </movieContext.Provider>
  );
};

export default MoviesContextData;
