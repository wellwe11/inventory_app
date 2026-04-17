import type { Request, Response } from "express";

// import { genres } from "../../../public/resources/movieGenres.js";
import { getAllMovies } from "../../DB/Queries/getMovies.js";
import { getAllGenres } from "../../DB/Queries/getGenres.js";

const listGet = async (req: Request, res: Response) => {
  const movies = await getAllMovies();
  const genres = await getAllGenres();

  const genresArray = genres.map(({ name }) => name);

  console.log(genresArray);

  res.render("index", {
    genres: genresArray,
  });
};

export default listGet;
