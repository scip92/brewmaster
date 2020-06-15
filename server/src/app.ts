import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";

var fs = require('fs');
const app = express();
const filePath = "C:/Users/Benjamin Hacker/Desktop/Programmieren/temperature"
var temperatures = []

app.set("port", 5000);

app.use(noCors);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/temperature", (req: Request, res: Response) => {
    let temperature = fs.readFileSync(filePath).toString()
    res.send(temperature.split("t=")[1])
});

export default app;