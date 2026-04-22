// Create validator

import { getFilteredMovies } from "../../DB/Queries/getFilteredMovies.js";

const listPost = async (req, res) => {
  const { filtered_genres, years, minYear, maxYear, genres } = req.body;
  console.log(filtered_genres);

  // Because user could technically drag highest val to lowest, and lowest to highest. We simply sort the items.
  // Years will always be an array of 2 integers. So we can simply use index 0 and 1.
  const sortedYears = [years[0], years[1]].sort();
  const filteredGenres =
    filtered_genres && [filtered_genres].length > 0
      ? [filtered_genres].flat().map((item) => JSON.parse(item))
      : null;

  const filteredMovies = await getFilteredMovies(
    filteredGenres || JSON.parse(genres),
    sortedYears,
  );

  // Update minYear and MaxYear to adapt after the filtered movies, based on genre. So if user selects genre Thriller, the min/maxYear should be based off of that.

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
