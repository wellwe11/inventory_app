import type { Request, Response } from "express";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Fantasy",
  "Documentary",
  "Animation",
];

const listGet = async (req: Request, res: Response) => {
  res.render("index", {
    genres,
  });
};

export default listGet;
