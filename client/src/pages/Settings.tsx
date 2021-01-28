import { Box, Button, Container, FormControl, FormLabel, Switch, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getStirrer, getTargetTemperature, saveTargetTemperature, setStirrer } from "../api/client";
import { Stirrer } from "../models/Stirrer";

export function Settings(): JSX.Element {
    const [targetTemperature, setTargetTemperature] = useState(50);
    const [isStirrerOn, setIsStirrerOn] = useState(false);

    useEffect(() => {
        getTargetTemperature().then((res) => setTargetTemperature(res.target_temperature));
        getStirrer().then((res: Stirrer) => setIsStirrerOn(res.enabled));
    }, []);

    const onStirrerChange = async (_: any, isChecked: boolean) => {
        await setStirrer(isChecked);
        setIsStirrerOn(isChecked);
    }

    return (
      <Container maxWidth="sm">
          <Box mt={4} display="flex" alignItems="center">
              <TextField
                id="outlined-basic"
                label="Target Temperature"
                type="number"
                variant="outlined"
                value={targetTemperature}
                onChange={(e) => setTargetTemperature(parseInt(e.target.value))}
              />
              <Box marginLeft={2}>
                  <Button onClick={() => saveTargetTemperature(targetTemperature)}
                          color="primary"
                          variant="contained">Set</Button>
              </Box>
          </Box>
          <Box mt={4}>
              <FormControl component="fieldset">
                  <FormLabel component="legend">Stirrer</FormLabel>
                  <Switch checked={isStirrerOn} onChange={onStirrerChange} color="primary"/>
              </FormControl>
          </Box>
      </Container>
    )
}