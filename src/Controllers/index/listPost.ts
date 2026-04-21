// Create validator

import { getFilteredMovies } from "../../DB/Queries/getFilteredMovies.js";

const listPost = async (req, res) => {
  const { filtered_genres, years, minYear, maxYear, genres } = req.body;

  // Because user could technically drag highest val to lowest, and lowest to highest. We simply sort the items.
  // Years will always be an array of 2 integers. So we can simply use index 0 and 1.
  const sortedYears = [years[0], years[1]].sort();
  const filteredMovies = await getFilteredMovies(genres, sortedYears);
  const genresToArray = genres.split(",");

  // Fix filtered_genres so it queries for that as well
  // store years and add those as values to years-range so it keeps previous years when making new search

  console.log(sortedYears);

  res.render("index", {
    movies: filteredMovies,
    minYear: +minYear,
    maxYear: +maxYear,
    genres: genresToArray,

    // Additional new info, so that whenever page refreshes, it shows the previously filtered options
    checkedGenres: filtered_genres,
    filteredMinYear: sortedYears[0],
    filteredMaxYear: sortedYears[1],
  });
};

export default listPost;
