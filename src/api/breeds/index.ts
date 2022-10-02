import { Router, Request, Response } from "express";
import { Breeds } from "../../services/breeds";

const b = new Breeds();

const breeds = Router();

breeds.get("/breeds", async (_req: Request, res: Response) => {
  try {
    const data = await b.index();
    res.json(data);
  } catch (err) {
    res.status(503).json(err);
  }
});

export default breeds;
