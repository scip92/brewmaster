import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";
import dotenv from 'dotenv';
import "reflect-metadata";
import Datastore from "nedb";

dotenv.config();


var fs = require('fs');
const app = express();
const filePath = process.env.SENSOR_PATH;
const useFake = (process.env.USE_FAKER === "true");
const measurementInterval = parseFloat(process.env.MEASUREMENT_INTERVAL)
const dataStore = new Datastore({ autoload: true, filename: "./data/temperatures.db" });
dataStore.loadDatabase();

function readCurrentTemperature(): number {
    if (useFake) {
        return Math.random() * 80 + 20;
    } else {
        const readString = fs.readFileSync(filePath).toString()
        return readString.split("t=")[1] / 1000
    }
}

setInterval(() => {
    dataStore.insert({ value: readCurrentTemperature(), timestamp: new Date() });
}, 1000 * measurementInterval)

app.set("port", process.env.PORT);

app.use(noCors);
app.use(express.static("public"));

app.get("/temperature", async (req: Request, res: Response) => {
    dataStore.find({}).sort({ timestamp: -1 }).limit(1).exec((err: Error, doc: any) => {
        res.send(doc[0]);
    })
});

app.get("/temperatures", async (req: Request, res: Response) => {
    dataStore.find({}, (err: Error, all: any) => {
        res.send(JSON.stringify(all));
    })
});

export default app;