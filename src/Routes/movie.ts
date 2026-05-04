import { Router } from "express";
import movieGet from "../Controllers/movie/movieGet.js";
import movieEditPost from "../Controllers/movie/movieEditPost.js";

const movieRouter = Router();

movieRouter.get("/", movieGet);
movieRouter.post("/", movieEditPost);

export default movieRouter;
