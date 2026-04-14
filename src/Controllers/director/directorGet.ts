import type { Request, Response } from "express";

const directorGet = async (req: Request, res: Response) => {
  const reqId = req.query.id;
  if (reqId) {
    console.log(reqId);
  }

  res.render("director");
};

export default directorGet;
