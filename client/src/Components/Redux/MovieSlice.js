import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:'movies',
    initialState:{
        movies:[],
        filterd:[]
    },

  reducers:{
    getAllMovies(state,action){
     const movies=action.payload;
     state.movies=movies;
     state.filterd=movies; 
    },
    getSearchedMovie(state,action){
    const query=action.payload;
    if(query){
    state.movies=state.filterd.filter(
      (movie) =>
        movie.movieName.toLowerCase().includes(query.toLowerCase()) ||
        movie.details.toLowerCase().includes(query.toLowerCase()) ||
        movie.Director.toLowerCase().includes(query.toLowerCase())
    )}
    else{
      state.movies=state.filterd
    }
    },
    addNewMovie(state,action){
      console.log(state.movies);
     const newMovie=action.payload;
         state.movies.push(newMovie)
    },
    
    updateMovieById(state,action){
    const updatedMovie=action.payload;
        state.movies=state.movies.filter((movie)=>updatedMovie._id!==movie._id)
        state.movies.push(updatedMovie)
      //  const sortedData= state.movies.sort((a,b)=>a.createdAt-b.createdAt)
    },

    updateReviews(state,action){
      const updatedMovie=action.payload;
      state.movies=state.movies.filter((movie)=>updatedMovie._id!==movie._id)
      state.movies.push(updatedMovie)
    },

    deleteMovieById(state,action){
        const id=action.payload;
        state.movies= state.movies.filter(movie=>movie._id!==id)
    }
  }
})

export const movieActions= movieSlice.actions;
export default movieSlice;