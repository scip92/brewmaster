import React, { useState } from "react"
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core"
import { apiUrl } from "./api";
import { theme } from "./theme";


export function TemperaturePanel(props: { currentTemperature: number; targetTemperature: number }) {

  const [targetToSet, setTargetToSet] = useState(50);
  const [isMeasurementRunning, setRunning] = useState(true)

  const saveTargetTemperature = () => {
    fetch(`${apiUrl}/target_temperature`,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "new_value": targetToSet }), method: "post"
      })
  }

  const getBoxColor = (currentTemperature: number) => {
    if (currentTemperature < props.targetTemperature - 3) {
      return theme.palette.info.main
    }
    if (currentTemperature > props.targetTemperature + 3) {
      return theme.palette.warning.main
    }
    return theme.palette.success.main
  }

  return <>
    <Box width="100%">
      <Paper elevation={3} color="secondary">
        <Box display="flex" justifyContent="center" bgcolor={getBoxColor(props.currentTemperature)}>
          <Typography variant="h2">{props.currentTemperature} °C</Typography>
        </Box>
      </Paper>
    </Box>
    <Box width="100%" marginTop={4} display="flex" justifyContent="center" alignItems="center">
      <TextField
        id="outlined-basic"
        label="Target Temperature"
        variant="outlined"
        value={targetToSet}
        type="number"
        onChange={(e) => setTargetToSet(parseInt(e.target.value))}
      />
      <Button
        onClick={saveTargetTemperature}
        color="primary"
        variant="contained"
      >
        Set
        </Button>
    </Box>
    <Box width="100%" display="flex" justifyContent="center" style={{ minHeight: '2rem' }}    >
      <Typography variant="body2" color="error">{targetToSet === props.targetTemperature ? "" : "New target not set yet"}</Typography>
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