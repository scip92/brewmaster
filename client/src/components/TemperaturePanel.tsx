import React, { useEffect, useState } from "react"
import { Box, Paper, Typography } from "@material-ui/core"
import { theme } from "../theme";
import { getCurrentTemperature, getTargetTemperature } from "../api/client";
import { withStyles } from "@material-ui/core/styles";
import { PropsWithChildren } from "react";

const WhiteTextTypography = withStyles({
    root: {
        color: "#FFFFFF"
    }
})(Typography);

export function TemperaturePanel(): React.ReactElement {
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
        }, 2000)

    }, [isInitialized]);


    const getBoxColor = (currentTemperature: number) => {
        if (currentTemperature < targetTemperature - 3) {
            return theme.palette.info.main
        }
        if (currentTemperature > targetTemperature + 3) {
            return theme.palette.error.main
        }
        return theme.palette.success.main
    }

    function TemperatureBox(props: PropsWithChildren<{ bgColor: any }>) {
        return (
          <Paper square elevation={3} color="secondary">
              <Box display="flex" p={5} justifyContent="center" bgcolor={props.bgColor}>
                  {props.children}
              </Box>
          </Paper>
        );
    }

    return <>
        <Box width="100%">
            <TemperatureBox bgColor={getBoxColor(currentTemperature)}>
                <Typography variant="h2">{currentTemperature} °C</Typography>
            </TemperatureBox>
        </Box>
        <Box width="100%" mt={4}>
            <TemperatureBox bgColor={theme.palette.primary.main}>
                <WhiteTextTypography variant="h2">{targetTemperature} °C</WhiteTextTypography>
            </TemperatureBox>
        </Box>
    </>
}