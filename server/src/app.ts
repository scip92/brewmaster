import express from "express";
import { Request, Response } from "express";
import { noCors } from "./no-cors";

var fs = require('fs');
const app = express();
const filePath = "C:/Users/Benjamin Hacker/Desktop/Programmieren/temperature"
const getRandomTemperature = true
const refreshTime = 1
const temperatures: number[] = []

function readCurrentTemperature(): number {
    if (getRandomTemperature) {
        return Math.random() * 80 + 20;
    } else {
        const readString = fs.readFileSync(filePath).toString()
        return readString.split("t=")[1] / 1000
    }
}

setInterval(() => {
    console.log("eine Sekunde")
    temperatures.push(readCurrentTemperature())
    console.log(temperatures)
}, 1000 * refreshTime)

app.set("port", 5000);

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