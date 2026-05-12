import { body, query, validationResult } from "express-validator";
import { updateMovie } from "../../DB/Queries/updateMovie.js";
import { movieGetter } from "./movieGet.js";
import { updateMovie_genres } from "../../DB/Queries/updateMovie_genres.js";
import { getOrAltarDirectors } from "../../DB/Queries/getOrAltarDirectors.js";
import {
  blacklist,
  lengthErr,
  numErr,
  scriptErr,
  stringErr,
  yearLengthErr,
} from "../validationErrors.js";
import runErr from "../functions/runErr.js";

// Update to check input even further
const validateMovie = [
  // The body checkers are only a safety-net, because the html-inputs will limit users to the same check-logic
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage(lengthErr)
    .escape()
    .blacklist(blacklist)
    .withMessage(scriptErr)
    .isString()
    .withMessage(stringErr),

  body("year")
    .trim()
    .isLength({ min: 4 })
    .withMessage(yearLengthErr)
    .isNumeric()
    .withMessage(numErr),

  body("director_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(lengthErr)
    .escape()
    .blacklist(blacklist)
    .withMessage(scriptErr)
    .isString()
    .withMessage(stringErr),

  // Very important checker
  query("id")
    .optional()
    .escape()
    .blacklist(blacklist)
    .isNumeric()
    .withMessage(numErr),
];

const movieEditPost = [
  ...validateMovie,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return runErr(res, errors, "movie");
    }

    const movieId = req.query.id;

    if (isNaN(movieId)) {
      return runErr(res, "movieid is not of type number", "movie");
    }

    const { title, year, director_name, filtered_genres } = req.body;

    console.log("Updating movie...");

    // Update director
    const directorRows = await getOrAltarDirectors(director_name);

    // Update information about movie
    await updateMovie(movieId, title, year, directorRows[0].id);

    // Update movie_genres table as well
    await updateMovie_genres(movieId, filtered_genres);

    // redirect to movieGet
    await movieGetter(req, res);
  },
];

export default movieEditPost;
