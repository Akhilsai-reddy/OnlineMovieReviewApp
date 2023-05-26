import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import MoviesRoutes from "./Routes/MovieRoutes.js";
import MongoDb from "./DataBase/MongoDb.js";
import UserAuth from "./Routes/UserAuth.js";
import AdminAuth from "./Routes/AdminAuth.js"


const app = express();
app.use(cors());
app.use(bodyParser.json());

await MongoDb();

app.get("/", (req, res) => {
  res.send("Welcome...");
});

app.use("/movies", MoviesRoutes);
app.use("/users", UserAuth);
app.use("/admin",AdminAuth)
app.get('/reviews',)

app.listen(3001, () => console.log("app is running at http://localhost:3001"));
