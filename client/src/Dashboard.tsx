import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TemperaturePanel } from "./TemperaturePanel";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Dashboard() {
  const classes = useStyles();

  return (
    <Box marginTop={3} display="flex" flexDirection="column" alignItems="center">
      <div className={classes.root}>
        <TemperaturePanel />
      </div>
    </Box>
  );
}
