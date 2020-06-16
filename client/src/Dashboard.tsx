import React, { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Measurement } from "../../shared/measurement";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
  { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
];

export function Dashboard() {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    async function getTemperature() {
      const res = await fetch("http://localhost:5000/temperature");
      res.json().then((res) => setTemperature(res));
    }
    getTemperature();
  }, []);

  const [temperatures, setTemperatures] = useState<Measurement[]>([]);

  useEffect(() => {
    async function getTemperatures() {
      const res = await fetch("http://localhost:5000/temperatures");
      res.json().then((res) => setTemperatures(res));
    }
    getTemperatures();
  }, []);

  return (
    <Box marginTop={2}>
      <Typography variant="h3">
        {" "}
        Current Termperature: {temperature}{" "}
      </Typography>
      <LineChart width={400} height={400} data={temperatures}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </Box>
  );
}
