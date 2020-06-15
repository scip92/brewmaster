import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";

var fs = require('fs');
const app = express();
const filePath = "C:/Users/Benjamin Hacker/Desktop/Programmieren/temperature"
var getRandomTemperature = false

app.set("port", 5000);

app.use(noCors);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/temperature", (req: Request, res: Response) => {
    if (getRandomTemperature) {
        const temperature = Math.random() * 80 + 20;
        res.send(temperature.toFixed(2).toString());
    } else {
        const readString = fs.readFileSync(filePath).toString()
        const temperature = readString.split("t=")[1]/1000
        res.send(temperature.toFixed(2).toString())
    }
});

export default app;