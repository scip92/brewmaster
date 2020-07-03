import React, { useEffect, useState } from "react";
import { Typography, Box, TextField, Paper, Button } from "@material-ui/core";
import { apiUrl } from "./api";
import { theme } from "./theme";

export function Dashboard() {
  const [temperature, setTemperature] = useState(0);
  const [tempMin, setTempMin] = useState(50)
  const [tempMax, setTempMax] = useState(70)
  const [savedMin, setSavedMin] = useState(50);
  const [savedMax, setSavedMax] = useState(70);
  const [isMeasurementRunning, setRunning] = useState(true)
  const [processStep, setStep] = useState("")

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
    if (currentTemperature < savedMin) {
      return theme.palette.info.main
    } if (currentTemperature > savedMax) {
      return theme.palette.warning.main
    }
    return theme.palette.success.main
  }

  const tempSetMatch = () => {
    if (tempMin === savedMin && tempMax === savedMax) {
      return true
    }
    else {
      return false
    }
  }

  const checkIntervallError = (minTemp: number, maxTemp: number) => {
    if (maxTemp < minTemp) {
      return true
    } else {
      return false
    }
  }



  return (
    <Box marginTop={3} display="flex" flexDirection="column" alignItems="center">
      <Box width="100%" maxWidth="500px">
        <Paper elevation={3} color="secondary">
          <Box display="flex" justifyContent="center" bgcolor={getBoxColor(temperature)}>
            <Typography variant="h2">{temperature} °C</Typography>
          </Box>
        </Paper>
      </Box>
      <Box marginTop={4} display="flex" flexDirection="row" alignItems="stretch" justifyContent="center" maxWidth="500px">
        <TextField
          id="outlined-basic"
          label="Minimum"
          variant="outlined"
          type="number"
          value={tempMin}
          onChange={(e) => setTempMin(parseInt(e.target.value))}
        />
        <Box width="50px" />
        <Button
          style={{ minWidth: '10rem' }}
          variant="contained"
          color={(tempSetMatch() ? "primary" :"secondary")}
          onClick={() => {
            if (checkIntervallError(tempMin, tempMax)) {
              alert("Maximum value is smaller than minimum Value. Please Adjust.")
            }
            else {
              setSavedMin(tempMin); setSavedMax(tempMax);
            }
          }}
        >
          Set Values
        </Button>
        <Box width="50px" />
        <TextField
          id="outlined-basic"
          label="Maximum"
          variant="outlined"
          type="number"
          value={tempMax}
          onChange={(e) => setTempMax(parseInt(e.target.value))}
        />
      </Box>
      <Box marginTop={4}>
        <TextField
          id="outlined-basic"
          label="Process Name"
          variant="outlined"
          value={processStep}
          onChange={(e) => setStep(e.target.value)}
        />
      </Box>
      <Box marginTop={4}>
        <Button
          style={{ minWidth: '500px' }}
          variant="contained"
          disabled={(processStep === "" || !tempSetMatch())}
          color={isMeasurementRunning ? "primary" : "secondary"}
          onClick={() => setRunning(!isMeasurementRunning)}
        >
          {isMeasurementRunning ? "Start" : "Stop"}
        </Button>
      </Box>
    </Box >
  );
}
