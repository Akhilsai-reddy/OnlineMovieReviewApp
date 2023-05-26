import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./MovieSlice";

const store=configureStore({
    reducer:{
        movies:movieSlice.reducer
    }
})

export default store;