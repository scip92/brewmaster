import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";
import dotenv from 'dotenv';
dotenv.config();

var fs = require('fs');
const app = express();
const filePath = process.env.PATH_SAMPLE_DATA
const getRandomTemperature = process.env.USE_FAKER
const refreshTime = process.env.MEASUREMENT_INTERVAL
const temperatures: number[] = []

function readCurrentTemperature(): number {
    if (getRandomTemperature) {
        return Math.random() * 80 + 20;
    } else {
        const readString = fs.readFileSync(filePath).toString()
        return readString.split("t=")[1] / 1000
    }
}

console.log(process.env.PATH_SAMPLE_DATA)
console.log("Test")

setInterval(() => {
    temperatures.push(readCurrentTemperature())
}, 1000 * refreshTime)

app.set("port", process.env.PORT);

app.use(noCors);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/temperature", (req: Request, res: Response) => {
    res.send(temperatures[temperatures.length - 1].toFixed(2).toString())
});

app.get("/temperatures", (req: Request, res: Response) => {
    res.send(temperatures.map(t => t.toFixed(2)));
});

export default app;