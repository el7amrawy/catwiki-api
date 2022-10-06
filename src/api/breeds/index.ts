import { Router, Request, Response } from "express";
import { Breeds } from "../../services/breeds";
import { topSearched, rankBreeds } from "../../services/topSearched";

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
    res.status(503).json(`${err}`);
  }
});

breeds.get("/breeds/length", async (_req: Request, res: Response) => {
  try {
    const length = await b.length();
    res.json({ length });
  } catch (err) {
    res.status(503).json(`${err}`);
  }
});

breeds.get("/breeds/images", async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as unknown as string);
    const id = req.query.id as unknown as string;

    const images = await b.showImages(id, limit);
    res.json(images);
  } catch (err) {
    res.status(404).json(`${err}`);
  }
});

breeds.post("/breeds/rank", (req: Request, res: Response) => {
  try {
    if (req.body.breed?.id.length && req.query.limit?.length) {
      const { breed } = req.body;
      const limit = parseInt(req.query.limit as unknown as string);

      const top10 = rankBreeds(topSearched, breed).slice(0, limit);

      res.json(top10);
    } else {
      throw new Error("please provide limit or breed or both");
    }
  } catch (err) {
    res.status(503).json(`${err}`);
  }
});

breeds.get("/breeds/rank", (req: Request, res: Response) => {
  // console.log(1);

  try {
    if (req.query.limit?.length) {
      const limit = parseInt(req.query.limit as unknown as string);

      const top10 = topSearched.slice(0, limit);

      res.json(top10);
    } else {
      throw new Error("limit rquired");
    }
  } catch (err) {
    res.status(400).json(`${err}`);
  }
});

breeds.get("/breeds/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const breed = await b.show(name);
    res.json(breed);
  } catch (err) {
    res.status(404).json(`${err}`);
  }
});

export default breeds;
