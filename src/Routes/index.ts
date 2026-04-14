import { Router } from "express";
import listGet from "../Controllers/index/listGet.js";
import listPost from "../Controllers/index/listPost.js";

const indexRoute = Router();

indexRoute.get("/", listGet);
indexRoute.post("/", listPost);

export default indexRoute;
