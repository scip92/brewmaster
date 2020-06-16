import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";
import dotenv from 'dotenv';
dotenv.config();

var fs = require('fs');
const app = express();
const filePath = process.env.SENSOR_PATH
const useFake = process.env.USE_FAKER
const measurementInterval = parseFloat(process.env.MEASUREMENT_INTERVAL)
const temperatures: number[] = []

console.log(measurementInterval)

function readCurrentTemperature(): number {
    if (useFake) {
        return Math.random() * 80 + 20;
    } else {
        const readString = fs.readFileSync(filePath).toString()
        return readString.split("t=")[1] / 1000
    }
}

setInterval(() => {
    temperatures.push(readCurrentTemperature())
}, 1000 * 1)

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