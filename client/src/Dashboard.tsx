import React, { useEffect, useState, FormEvent } from "react";
import { Typography, Box, Button, TextField, Paper, FormControl } from "@material-ui/core";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { Measurement } from "./models/measurement";
import { apiUrl } from "./api";
import { theme } from "./theme";

export function Dashboard() {
  const [temperature, setTemperature] = useState(0);
  const [min, setMin] = useState(50);
  const [max, setMax] = useState(70);
  const [errorText, setErrorText] = useState("")

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
    if (currentTemperature < min) {
      return theme.palette.info.main
    } if (currentTemperature > max) {
      return theme.palette.warning.main
    }
    return theme.palette.success.main
  }

  const checkIntervallError = (minTemp: number, maxTemp: number) => {
    if (maxTemp < minTemp) {
      return true
    } else {
      return false
    }
  }

  return (
    <Box marginTop={2} display="flex" flexDirection="column" alignItems="center">
      <Box width="100%" maxWidth="500px">
        <Paper elevation={3} color="secondary">
          <Box display="flex" justifyContent="center" bgcolor={getBoxColor(temperature)}>
            <Typography variant="h1">{temperature} °C</Typography>
          </Box>
        </Paper>
      </Box>
      <Box marginTop={4} display="flex" flexDirection="row" alignItems="stretch" justifyContent="space-between" maxWidth="500px">
        <TextField
          error={checkIntervallError(min, max)}
          id="outlined-basic"
          label="Minimum"
          variant="outlined"
          type="number"
          value={min}
          onChange={(e) => setMin(parseInt(e.target.value))}
        />
        <Box width="100px" />
        <TextField
          error={checkIntervallError(min, max)}
          id="outlined-basic"
          label="Maximum"
          variant="outlined"
          type="number"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
        />
      </Box>
    </Box >
  );
}
