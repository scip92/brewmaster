import React, { useEffect, useState } from "react";
import { Typography, Box, Button, TextField } from "@material-ui/core";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { Measurement } from "./models/measurement";
import { apiUrl } from "./api";
import { theme } from "./theme";

export function Dashboard() {
  const [temperature, setTemperature] = useState(0);
  var minTemperatureSet = 50;
  var maxTemperatureSet = 70;

  useEffect(() => {
    async function getTemperature() {
      const res = await fetch(`${apiUrl}/temperature`);
      res.json().then((res) => setTemperature(res.value.toFixed(1)));
    }
    setInterval(() => {
      getTemperature();
    }, 1000)
  }, []);

  const getBoxColor = (currentTemperature: number) => {
    if (currentTemperature < minTemperatureSet) {
      return theme.palette.info.main
    } if (currentTemperature > maxTemperatureSet) {
      return theme.palette.warning.main
    } else {
      return theme.palette.success.main
    }
  }


  const [temperatures, setTemperatures] = useState<Measurement[]>([]);

  async function getTemperatures() {
    const res = await fetch(`${apiUrl}/temperatures`);
    res.json().then((res) => setTemperatures(res));
  }

  useEffect(() => {
    getTemperatures();
  }, []);

  return (
    <Box marginTop={2}>
      <Typography variant="h3">
        Current Termperature:
        </Typography>
      <Box bgcolor={getBoxColor(temperature)}>
        <Typography variant="h1">
          {temperature}
        </Typography>
      </Box>
      <input type="text" />
      <Button onClick={getTemperatures} color="primary">Refresh</Button>
      <input type="text" />
    </Box >
  );
}
