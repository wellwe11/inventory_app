import { Router } from "express";
import movieGet from "../Controllers/movie/movieGet.js";

const movieRouter = Router();

// I think I need to approach this by adding an id to movie. So link becomes "movie?id=402"
// Then when I also click 'edit' movie I can direct it to query for that particular movie as well.

// Edit so link from /index redirects to movie?id=402 or whatever, and then inside of movieGet check the req.query.params

movieRouter.get("/", movieGet);

export default movieRouter;
