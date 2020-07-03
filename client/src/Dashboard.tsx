import React, { useEffect, useState } from "react";
import { Typography, Box, TextField, Paper, Button } from "@material-ui/core";
import { apiUrl } from "./api";
import { theme } from "./theme";

export function Dashboard() {
  const [temperature, setTemperature] = useState(0);
  const [tempMin, setTempMin] = useState(50)
  const [tempMax, setTempMax] = useState(70)
  const [savedMin, setMin] = useState(50);
  const [savedMax, setMax] = useState(70);

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

  const getButtonColor = () => {
    if (tempMin === savedMin && tempMax === savedMax) {
      return "primary"
    }
    else {
      return "secondary"
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
          id="outlined-basic"
          label="Minimum"
          variant="outlined"
          type="number"
          value={tempMin}
          onChange={(e) => setTempMin(parseInt(e.target.value))}
        />
        <Box width="50px" />
        <Button
          variant="contained"
          color={getButtonColor()}
          onClick={() => {
            if (checkIntervallError(tempMin, tempMax)) {
              alert("Maximal value is smaller than minimal Value. Please Adjust. ")
            }
            else {
              setMin(tempMin); setMax(tempMax);
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
    </Box >
  );
}
