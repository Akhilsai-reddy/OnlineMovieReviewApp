import { Router } from "express";
import Movies from "../Models/Movies.js";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const movies = await Movies.find({}).sort({createdAt:-1});
    res.send(movies);
  } catch (error) {
    console.log(error.message);
  }
});

// router.get("?q=", async (req, res) => {
//   const query=req.query.q;
//   try {
//     const movies = await Movies.find({movieName:query});
//     res.send(movies);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

router.post("/", async (req, res) => {
  const { movieName, src, Director, details,reviews,Rating } = req.body;
  const movies = new Movies({
    movieName,
    src,
    Director,
    details,
    reviews,
    Rating
  });
  try {
    await movies.save();
    res.send({ status: "success" });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movies.find({ _id: req.params.id });
    res.send(movie);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Movies.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send('success')
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Movies.deleteOne({ _id: req.params.id});
    res.send({ status: "success"});
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
