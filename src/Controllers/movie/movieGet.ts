import type { Request, Response } from "express";
import { getMovie } from "../../DB/Queries/getMovie.js";
import { getAllGenres } from "../../DB/Queries/getGenres.js";
import { query, validationResult } from "express-validator";
import { blacklist, numErr } from "../validationErrors.js";
import runErr from "../functions/runErr.js";

const validateId = [
  query("id")
    .optional()
    .escape()
    .blacklist(blacklist)
    .isNumeric()
    .withMessage(numErr),
];

export const movieGetter = async (req, res) => {
  const movieId = req.query.id;

  if (!Number(movieId)) {
    return runErr(res, "movieid is not of type number", "error");
  }

  const editMode = req.query.edit || false;

  const movieObj = await getMovie(movieId);
  const allGenres = await getAllGenres();

  const { id, title, src, year, director_name, director_id, genre_list } =
    movieObj[0];

  res.render("movie", {
    id,
    src,

    title,
    year,
    director_name,

    director_id,
    genre_list,
    allGenres: allGenres.map(({ id, name }) => ({ id, name })),
    editMode,
  });
};

const movieGet = [
  ...validateId,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return runErr(res, errors, "error");
    }

    await movieGetter(req, res);
  },
];

export default movieGet;

// When user writes http://localhost:3001/movie?id=a, navigate to error-page
