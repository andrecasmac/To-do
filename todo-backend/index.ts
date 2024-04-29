import express, { Express, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const app: Express = express();
const prisma = new PrismaClient()
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany()
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({error: err})
  }
  
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});