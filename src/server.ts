/** I've installed the following packages:
 * Express (The server)
 * express-validator (for validating communication with the server)
 * pg (Allows me to use sql-commands like psql (to enter db), GET, ALL etc.)
 * dotenv (Allows me to read the .env)
 * ejs (for server-side markup)
 */

/** FileStructure:
 * Controllers: POST/GET functions
 * DB: File for pool (where env is imported(Setup once I use a cloud-service)), and Queries/: For query functions
 * Errors: Extending error-handler classes
 * Public: for TS
 * Routes: For Specific pages and their routes
 * Views: For EJS files, Components: For abstract components
 */

/** What type of DB should I make?
 * MoivePosters!
 * Year of release
 * Genre(s)
 * Director
 *
 *
 * Create a table for Director with specific id
 * Create table for movie with specific id
 *
 * Create table for 'entity'. This is the object that retrieves final info so: { director: 1, movie: 13 }
 * movie: { id: 13, title: "Solaris", img: src, year: 1972, genres: ["Sci-Fi", "Drama"] }
 * director: { id: 1, name: "Andrei Tarkovsky" }
 *
 *
 * Like so we can filter by year, genres. Lets say:
 * Find movies year 1972.
 * Or find movies with "Sci-Fi"
 *
 *
 * User should also be able to click director, which takes user to direct page that has basic info and related movies
 * User should also search for item and it should look for movie-title
 */

/** On page-load, display a home page:
 * This is an unfiltered home-page displaying each image of movie, together with what genre and director
 */

/** UI
 * Middle: Movie-posters
 * Left: Filter, this is a form. So: Genres to click. Years from-to, and if user clicks a director, it'll pop up as extra filter
 */

import express from "express";

import indexRoute from "./Routes/index.js";
import unqiueItemRouter from "./Routes/uniqueItem.js";
import directorRouter from "./Routes/director.js";

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
app.use("/uniqueItem", unqiueItemRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log("Listening to port:", PORT);
});
