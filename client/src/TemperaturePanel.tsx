import React, { useState, useEffect } from "react"
import { Box, Paper, Typography, TextField, Button } from "@material-ui/core"
import { apiUrl } from "./api";
import { theme } from "./theme";



export function TemperaturePanel() {

  const [temperature, setTemperature] = useState(0);
  const [targetTemperature, setTargetTemperature] = useState(0);
  const [isMeasurementRunning, setRunning] = useState(true)

  useEffect(() => {
    async function getTemperature() {
      const res = await fetch(`${apiUrl}/data`);
      res.json().then((res) => setTemperature(res.measured_temperature.toFixed(1)));
    }

    setInterval(() => {
      getTemperature();
    }, 2000)
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/target-temperature`).then(res => res.json()).then(response => setTargetTemperature(response));
  }, [])

  const saveTargetTemperature = () => {
    fetch(`${apiUrl}/target-temperature`, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "new_value": targetTemperature }), method: "post" }).then(res => res.json()).then(response => setTargetTemperature(response));
  }

  const getBoxColor = (currentTemperature: number) => {
    if (currentTemperature < targetTemperature - 3) {
      return theme.palette.info.main
    }
    if (currentTemperature > targetTemperature + 3) {
      return theme.palette.warning.main
    }
    return theme.palette.success.main
  }

  return <>
    <Box width="100%">
      <Paper elevation={3} color="secondary">
        <Box display="flex" justifyContent="center" bgcolor={getBoxColor(temperature)}>
          <Typography variant="h2">{temperature} °C</Typography>
        </Box>
      </Paper>
    </Box>
    <Box width="100%" marginTop={4} display="flex" justifyContent="center" alignItems="center">
      <TextField
        id="outlined-basic"
        label="Target Temperature"
        variant="outlined"
        value={targetTemperature}
        type="number"
        onChange={(e) => setTargetTemperature(parseInt(e.target.value))}
      />
      <Button
        onClick={saveTargetTemperature}
        color="primary"
        variant="contained"
      >
        Set
        </Button>
    </Box>
    <Box width="100%" marginTop={4} display="flex" justifyContent="center">
      <Button
        style={{ minWidth: '16rem' }}
        variant="contained"
        color={isMeasurementRunning ? "primary" : "secondary"}
        onClick={() => setRunning(!isMeasurementRunning)}
      >
        {isMeasurementRunning ? "Start Measurement" : "Stop Measurement"}
      </Button>
    </Box>
  </>
}