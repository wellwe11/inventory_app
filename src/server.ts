import express from "express";

import indexRoute from "./Routes/index.js";
import movieRouter from "./Routes/movie.js";
import directorRouter from "./Routes/director.js";
import addMovieRouter from "./Routes/addMovie.js";

import dotenv from "dotenv";

import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoute);
app.use("/director", directorRouter);
app.use("/movie", movieRouter);
app.use("/addMovie", addMovieRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log("Listening to port:", PORT);
});

// todo

// -- GET

// -- POST
// fix /edit movie
// fix /addMovie

// -- STYLE
// Create an abstract <a> class which I apply to all <a>'s that make it look like a nice button
// Currently, all <a> have a blue text with an underline which is ugly.

// -- LOGIC
// create logic for restricting users from deleting movies and allowing admin to delete movie

// -- GENERAL
// Add reset-button to filter-form
// Create a 'nav-bar' which has Home always
// Add security that checks user-inputs (this includes editing info, queries from url etc.)
// style website
// add data to cloud
// Create some more rules for css to not select texts etc.
