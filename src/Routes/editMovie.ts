import { Router } from "express";
import editMovieGet from "../Controllers/editMovie/editMovieGet.js";

const editMovieRouter = Router();

editMovieRouter.get("/", editMovieGet);

export default editMovieRouter;
