import type { Request, Response } from "express";

// import { genres } from "../../../public/resources/movieGenres.js";
import { getAllMovies } from "../../DB/Queries/getMovies.js";
import { getAllGenres } from "../../DB/Queries/getGenres.js";

const listGet = async (req: Request, res: Response) => {
  const movies = await getAllMovies();
  const genres = await getAllGenres();

  const movieYears = movies.map(({ year }) => year).sort();
  const minMaxYears = {
    minYear: +movieYears[0],
    maxYear: +movieYears[movieYears.length - 1],
  };

  res.render("index", {
    genres,
    minYear: minMaxYears.minYear,
    maxYear: minMaxYears.maxYear,
    movies,
    checkedGenres: [],

    filteredMinYear: null,
    filteredMaxYear: null,
  });
};

export default listGet;
