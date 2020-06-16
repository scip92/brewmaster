import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";
import dotenv from 'dotenv';
import { Measurement } from "./measurement";

dotenv.config();

var fs = require('fs');
const app = express();
const filePath = process.env.SENSOR_PATH;
const useFake = process.env.USE_FAKER;
const measurementInterval = parseFloat(process.env.MEASUREMENT_INTERVAL)
const temperatures: Measurement[] = []

function readCurrentTemperature(): number {
    if (useFake) {
        return Math.random() * 80 + 20;
    } else {
        const readString = fs.readFileSync(filePath).toString()
        return readString.split("t=")[1] / 1000
    }
}

setInterval(() => {
    const newMeasurement = { value: readCurrentTemperature(), timestamp: new Date() };
    temperatures.push(newMeasurement);
    console.log(temperatures);
}, 1000 * measurementInterval)

app.set("port", process.env.PORT);

app.use(noCors);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/temperature", (req: Request, res: Response) => {
    res.send(temperatures[temperatures.length - 1].value.toFixed(2).toString())
});

app.get("/temperatures", (req: Request, res: Response) => {
    res.send(temperatures);
});

export default app;