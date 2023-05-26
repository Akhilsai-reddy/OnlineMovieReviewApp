import mongoose from "mongoose";
import { Schema } from "mongoose";

const moviesSchema = new Schema(
  {
    movieName: String,
    src: String,
    Director: String,
    details: String,
    reviews: Array,
    Rating: Number,
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("Movies", moviesSchema);
