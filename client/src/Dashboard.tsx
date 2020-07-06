import React, { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography, Tabs, Tab, AppBar } from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { apiUrl } from "./api";
import { theme } from "./theme";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Dashboard() {
  const [temperature, setTemperature] = useState(0);
  const [targetTemperature, setTargetTemperature] = useState(0);
  const [isMeasurementRunning, setRunning] = useState(true)
  const [processStep, setStep] = useState("")

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getTemperature() {
      const res = await fetch(`${apiUrl}/temperature`);
      res.json().then((res) => setTemperature(res.value.toFixed(1)));
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

  return (
    <Box marginTop={3} display="flex" flexDirection="column" alignItems="center">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Temperature" {...a11yProps(1)} />
            <Tab label="Timer" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Box width="100%">
            <Paper elevation={3} color="secondary">
              <Box display="flex" justifyContent="center" bgcolor={getBoxColor(temperature)}>
                <Typography variant="h2">{temperature} °C</Typography>
              </Box>
            </Paper>
          </Box>
          <Box width="100%" marginTop={4} display="flex" justifyContent="center" alignItems="center">
            <Box width="40%">
              <TextField
                id="outlined-basic"
                label="Target Temperature"
                variant="outlined"
                value={targetTemperature}
                type="number"
                onChange={(e) => setTargetTemperature(parseInt(e.target.value))}
              />
            </Box>
            <Box width="2em"></Box>
            <Box>
              <Button
                onClick={saveTargetTemperature}
                color="primary"
                variant="contained"
              >
                Set
            </Button>
            </Box>
          </Box>
          <Box width="100%" marginTop={4} display="flex" justifyContent="center">
            <Button
              style={{ minWidth: '15rem' }}
              variant="contained"
              color={isMeasurementRunning ? "primary" : "secondary"}
              onClick={() => setRunning(!isMeasurementRunning)}
            >
              {isMeasurementRunning ? "Start Measurement" : "Stop Measurement"}
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box width="100%">
            <Paper elevation={3} color="secondary">
              <Box display="flex" justifyContent="center" bgcolor={getBoxColor(temperature)}>
                <Typography variant="h2">{temperature} °C</Typography>
              </Box>
            </Paper>
          </Box>
          <Box marginTop={4} width="100%" display="flex" justifyContent="center">
            <Button
              onClick={saveTargetTemperature}
              color="primary"
              variant="contained"
            >
              {isMeasurementRunning ? "Start" : "Pause"}
            </Button>
            <Box width="2em">
            </Box>
            <Button
              onClick={saveTargetTemperature}
              color="primary"
              variant="contained"
            >
              Reset
            </Button>
          </Box>
        </TabPanel>
      </div>
    </Box>
  );
}
