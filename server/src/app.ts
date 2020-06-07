import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";

const app = express();

app.set("port", 5000);

app.use(noCors);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/temperature", (req: Request, res: Response) => {
    const temperature = Math.random() * 80 + 20;
    res.send(temperature.toFixed(2).toString());
});

export default app;
