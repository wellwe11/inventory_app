import { Router } from "express";
import addMovieGet from "../Controllers/addMovie/addMovieGet.js";
import addMoviePost from "../Controllers/addMovie/addMoviePost.js";

const addMovieRouter = Router();

addMovieRouter.get("/", addMovieGet);
addMovieRouter.post("/", addMoviePost);

export default addMovieRouter;
