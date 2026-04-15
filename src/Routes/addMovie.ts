import { Router } from "express";
import addMovieGet from "../Controllers/addMovie/addMovieGet.js";

const addMovieRouter = Router();

addMovieRouter.get("/", addMovieGet);

export default addMovieRouter;
