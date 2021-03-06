import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

class Scrap {
  public id: string;
  public description: string;
  public detailing: string;

  constructor(description: string, detailing: string) {
    this.id = uuidv4();
    this.description = description;
    this.detailing = detailing;
  }
}

let scraps: Scrap[] = [];

//Create
app.post("/scraps", (request: Request, response: Response) => {
  const { description, detailing }: any = request.body;

  const scrap = new Scrap(description, detailing);

  scraps.push(scrap);

  return response.json(scrap);
});

//Read
app.get("/scraps/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  const scrap = scraps.find((p) => p.id === id);

  return response.json({ scrap });
});

app.get("/scraps", (request: Request, response: Response) => {
  return response.json(scraps);
});

//Update
app.put("/scraps/:id", (request: Request, response: Response) => {
  const { id } = request.params;
  const { description, detailing }: any = request.body;

  const updatedScrap = { id, description, detailing };

  scraps = scraps.map((scrap) => (scrap.id == id ? updatedScrap : scrap));

  return response.json(updatedScrap);
});

//Delete
app.delete("/scraps/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  scraps = scraps.filter((scrap) => scrap.id !== id);

  return response.status(204).json();
});

//Porta 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("servidor rodando...");
});
