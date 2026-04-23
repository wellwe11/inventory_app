import type { Request, Response } from "express";
import getDirectors from "../../DB/Queries/getDirectors.js";

const directorGet = async (req: Request, res: Response) => {
  const reqId = req.query.id;
  const directorObj = await getDirectors(reqId);

  const { name, born, deceased, country, movie_list } = directorObj[0];

  console.log(directorObj[0]);
  res.render("director", {
    name,
    born,
    deceased,
    country,
    movie_list,
  });
};

export default directorGet;
