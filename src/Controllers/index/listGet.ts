import type { Request, Response } from "express";

const listGet = async (req: Request, res: Response) => {
  res.render("index");
};

export default listGet;
