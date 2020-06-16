import React, { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { Measurement } from "../../shared/measurement";

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
        <XAxis dataKey="timestamp" />
        <YAxis />
      </LineChart>
    </Box>
  );
}
