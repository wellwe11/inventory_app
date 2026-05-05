import { body, matchedData, validationResult } from "express-validator";
import { updateMovie } from "../../DB/Queries/updateMovie.js";

// for tomorrow: fix the POST form inside of movie.ejs.
// It should link to id.
// Also fix all inputs etc.
// Submit and inputs should only be enabled if user has clicked edit.

const alphaErr = "Temp err";
const lengthErr = "Must contain at least one character.";

// Update to check input even further
const validateMovie = [
  body("title")
    .trim()

    .isLength({ min: 1 })
    .withMessage(lengthErr),
];

// Here we will first sanitise user-input
// Then first see if we find a matching director
// if not, create a new director
// add director.id to movie's director_id
// update genres if changed
// update movie
// redirect to movie?id=movie.id
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
    const { title, year, director_name, filtered_genres } = req.body;
    console.log(filtered_genres);

    console.log("Updating...");
    const rows = await updateMovie(movieId, title, year, director_name);
    console.log(rows);

    // 1 Find movie based on ID
    // 2 Update movies information with new information
    // 3 get new movie information
    // redirect to movieGet
  },
];

export default movieEditPost;
