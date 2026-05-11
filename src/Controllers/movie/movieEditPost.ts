import { body, validationResult } from "express-validator";
import { updateMovie } from "../../DB/Queries/updateMovie.js";
import movieGet from "./movieGet.js";
import { updateMovie_genres } from "../../DB/Queries/updateMovie_genres.js";
import { getOrAltarDirectors } from "../../DB/Queries/getOrAltarDirectors.js";

const alphaErr = "Temp err";
const lengthErr = "Must contain at least one character.";

// Update to check input even further
const validateMovie = [
  body("title")
    .trim()

    .isLength({ min: 1 })
    .withMessage(lengthErr),
];

const movieEditPost = [
  ...validateMovie,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).render("/movie", {
        err: errors.array(),
      });
    }

    const movieId = req.query.id;
    const { title, year, director_name, filtered_genres, src } = req.body;
    console.log(req.body);

    console.log("Updating...");

    // Update director
    const directorRows = await getOrAltarDirectors(director_name);

    // Update information about movie
    await updateMovie(movieId, title, year, directorRows[0].id);

    // Update movie_genres table as well
    await updateMovie_genres(movieId, filtered_genres);

    // redirect to movieGet
    await movieGet(req, res);
  },
];

export default movieEditPost;
