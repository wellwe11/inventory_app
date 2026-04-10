import { Router } from "express";
import listGet from "../Controllers/index/listGet.js";

const indexRoute = Router();

indexRoute.get("/", listGet);

export default indexRoute;
