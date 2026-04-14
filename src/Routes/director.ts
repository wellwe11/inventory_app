import { Router } from "express";
import directorGet from "../Controllers/director/directorGet.js";

const directorRouter = Router();

directorRouter.get("/", directorGet);

export default directorRouter;
