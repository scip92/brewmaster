import React, { useEffect, useState } from "react"
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core"
import { theme } from "./theme";
import { getCurrentTemperature, getTargetTemperature, saveTargetTemperature } from "./api/client";

export function TemperaturePanel() {
  const [currentTemperature, setCurrentTemperature] = useState(0)
  const [targetTemperature, setTargetTemperature] = useState(50)
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (isInitialized) {
      getTargetTemperature().then((res) => setTargetTemperature(res.target_temperature));
      return;
    }

    setIsInitialized(true)
    setInterval(() => {
      getCurrentTemperature().then((res) => setCurrentTemperature(res.current_temperature));
    }, 1000)

  }, [isInitialized]);

  
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
        <Box display="flex" justifyContent="center" bgcolor={getBoxColor(currentTemperature)}>
          <Typography variant="h2">{currentTemperature} °C</Typography>
        </Box>
      </Paper>
    </Box>
    <Box width="100%" marginTop={4} display="flex" justifyContent="center" alignItems="center">
      <Box>

      </Box>
      <TextField
        id="outlined-basic"
        label="Target Temperature"
        variant="outlined"
        value={targetTemperature}
        type="number"
        onChange={(e) => setTargetTemperature(parseInt(e.target.value))}
      />
      <Box marginLeft={2}>
        <Button onClick={() => saveTargetTemperature(targetTemperature)} color="primary" variant="contained">Set</Button>
      </Box>
    </Box>
  </>
}