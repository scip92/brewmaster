import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";
import dotenv from 'dotenv';
import "reflect-metadata";
import {createConnection} from "typeorm";
import { Measurement } from "./entities/measurement";


dotenv.config();

createConnection({
    type: "sqlite",
    database: "./data/brewmaster.db",
    entities: [
        Measurement
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));

var fs = require('fs');
const app = express();
const filePath = process.env.SENSOR_PATH;
const useFake = process.env.USE_FAKER;
const measurementInterval = parseFloat(process.env.MEASUREMENT_INTERVAL)

function readCurrentTemperature(): number {
    if (useFake) {
        return Math.random() * 80 + 20;
    } else {
        const readString = fs.readFileSync(filePath).toString()
        return readString.split("t=")[1] / 1000
    }
}

setInterval(() => {
    const newMeasurement = new Measurement();
    newMeasurement.timestamp = new Date()
    newMeasurement.value = readCurrentTemperature()
    newMeasurement.save()
}, 1000 * measurementInterval)

app.set("port", process.env.PORT);

app.use(noCors);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/temperature", async (req: Request, res: Response) => {
    const allTemperatures = await Measurement.find();
    res.send(JSON.stringify(allTemperatures[allTemperatures.length - 1]));
});

app.get("/temperatures", async (req: Request, res: Response) => {
    const allTemperatures = await Measurement.find();
    res.send(JSON.stringify(allTemperatures));
});

export default app;