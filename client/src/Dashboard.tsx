import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { a11yProps, TabPanel } from "./TabPanel";
import { TemperaturePanel } from "./TemperaturePanel";
import { Stopwatch } from "./Stopwatch";
import { ProcessPanel } from "./ProcessPanel";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

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
          <ProcessPanel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TemperaturePanel />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Stopwatch />
        </TabPanel>
      </div>
    </Box>
  );
}
