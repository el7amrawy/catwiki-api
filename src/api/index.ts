import { Router, Request, Response } from "express";
import breeds from "./breeds";

const routes: Router = Router();

routes.use("/", breeds);

routes.all("*", (_req: Request, res: Response) => {
  res.status(404).send("404 not found");
});

export default routes;
