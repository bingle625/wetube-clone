import express from "express";
import { home, search } from "../controllers/videoControllers";
import { getJoin, postJoin, getLogin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin);
rootRouter.get("/search", search);

export default rootRouter;
