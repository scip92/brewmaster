import express from "express";
import { Request, Response } from "express";

const app = express();

app.set("port", 5000);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

export default app;
