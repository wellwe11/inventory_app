import type { Request, Response } from "express";
import { getOrAltarDirectors } from "../../DB/Queries/getOrAltarDirectors.js";
import { addMovie } from "../../DB/Queries/addMovie.js";
import { updateMovie_genres } from "../../DB/Queries/updateMovie_genres.js";
import { updateMovie } from "../../DB/Queries/updateMovie.js";

const addMoviePost = async (req: Request, res: Response) => {
  const { title, year, director_name, filtered_genres, src } = req.body;

  // Add movie to data-base. Like so, we can check if movie already exists, and decide if we should continue the process
  // Or inform the user if the data already exists.
  // We also retrieve the id from the movie, so it becomes very fast to update it.
  const movie = await addMovie(title);

  if (movie.length === 0) {
    // Here we will tell user that movie already exists
    return console.error("movie already exists");
  }

  const movieId = movie[0].id;

  // directors id
  const directorId = await getOrAltarDirectors(director_name);

  const updatedMovie = await updateMovie(
    movieId,
    title,
    year,
    directorId[0].id,
    src,
  );
  // Once we have the movieId, add that movieId to the movie_genres table

  await updateMovie_genres(movie[0].id, filtered_genres);

  // now return the object, and redirect user to movie?id=movieId with the correct information

  res.redirect(`movie?id=${movieId}`);
};

export default addMoviePost;
