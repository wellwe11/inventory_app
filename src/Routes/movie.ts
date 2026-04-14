import { Router } from "express";
import movieGet from "../Controllers/movie/movieGet.js";

const movieRouter = Router();

movieRouter.get("/", movieGet);

export default movieRouter;
