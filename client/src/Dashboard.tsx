import React, { useEffect, useState } from "react";
import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { a11yProps, TabPanel } from "./TabPanel";
import { TemperaturePanel } from "./TemperaturePanel";
import { Stopwatch } from "./Stopwatch";
import { ProcessPanel } from "./ProcessPanel";
import { apiUrl } from "./api";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [currentTemperature, setCurrentTemperature] = useState(0)
  const [currentProcess, setCurrentProcess] = useState("not set yet")
  const [targetTemperature, setTargetTemperature] = useState(50)
  const [isInitialized, setIsInitialized] = useState(false);

  const getCurrentTemperature = async () => {
    const res = await fetch(`${apiUrl}/current_temperature`);
    return res.json() as Promise<{"current_temperature": number}>;
  }

  const getCurrentProcess = async () => {
    const res = await fetch(`${apiUrl}/process`);
    return res.json() as Promise<{"current_process": string}>;
  }

  const getTargetTemperature = async () => {
    const res = await fetch(`${apiUrl}/target_temperature`);
    return res.json() as Promise<{"target_temperature": number}>;
  }

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    setIsInitialized(true)
    setInterval(() => {
      getCurrentTemperature().then((res) => setCurrentTemperature(res.current_temperature));
      getCurrentProcess().then((res) => setCurrentProcess(res.current_process));
      getTargetTemperature().then((res) => setTargetTemperature(res.target_temperature));
    }, 1000)

  }, [isInitialized]);


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
            <Tab label="Processes" {...a11yProps(1)} />
            <Tab label="Temperature" {...a11yProps(2)} />
            <Tab label="Timer" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ProcessPanel currentProcess={currentProcess} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TemperaturePanel targetTemperature={targetTemperature} currentTemperature={currentTemperature} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Stopwatch />
        </TabPanel>
      </div>
    </Box>
  );
}
