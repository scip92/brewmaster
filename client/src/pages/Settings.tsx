import {Box, Button, Container, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {getTargetTemperature, saveTargetTemperature} from "../api/client";

export function Settings(): JSX.Element {
    const [targetTemperature, setTargetTemperature] = useState(50)
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (isInitialized) {
            getTargetTemperature().then((res) => setTargetTemperature(res.target_temperature));
            return;
        }
        setIsInitialized(true)
    }, [isInitialized]);

    return (
      <Container>
          <Box width="100%"
               marginTop={4}
               display="flex"
               justifyContent="center"
               alignItems="center">
              <TextField
                id="outlined-basic"
                label="Target Temperature"
                variant="outlined"
                type="number"
                value={targetTemperature}
                onChange={(e) => setTargetTemperature(parseInt(e.target.value))}
              />
              <Box marginLeft={2}>
                  <Button onClick={() => saveTargetTemperature(targetTemperature)}
                          color="primary"
                          variant="contained">
                      Set
                  </Button>
              </Box>
          </Box>
      </Container>
    )
}