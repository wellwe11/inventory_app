// Create validator

import { getFilteredMovies } from "../../DB/Queries/getFilteredMovies.js";

const listPost = async (req, res) => {
  const { filtered_genres, years, minYear, maxYear, genres } = req.body;

  // Because user could technically drag highest val to lowest, and lowest to highest. We simply sort the items.
  // Years will always be an array of 2 integers. So we can simply use index 0 and 1.
  const sortedYears = [years[0], years[1]].sort();
  const filteredGenres = filtered_genres.map((item) => JSON.parse(item));
  const filteredMovies = await getFilteredMovies(filteredGenres, sortedYears);

  // Fix filtered_genres so it queries for that as well

  console.log(filteredGenres);
  res.render("index", {
    movies: filteredMovies,
    minYear: +minYear,
    maxYear: +maxYear,
    genres: JSON.parse(genres),

    // Additional new info, so that whenever page refreshes, it shows the previously filtered options
    checkedGenres: filteredGenres,
    filteredMinYear: sortedYears[0],
    filteredMaxYear: sortedYears[1],
  });
};

export default listPost;
