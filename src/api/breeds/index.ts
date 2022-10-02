import { Router, Request, Response } from "express";
import { Breeds } from "../../services/breeds";

const b = new Breeds();

const breeds = Router();

breeds.get("/breeds", async (req: Request, res: Response) => {
  try {
    if (req.query.limit) {
      const n = parseInt(req.query.limit as unknown as string);
      const data = await b.index(n);
      res.json(data);
    } else {
      const data = await b.index();
      res.json(data);
    }
  } catch (err) {
    res.status(503).json(err);
  }
});

breeds.get("/breeds/length", async (_req: Request, res: Response) => {
  try {
    const length = await b.length();
    res.json({ length });
  } catch (err) {
    res.status(503).json(err);
  }
});

export default breeds;
