import React, {useEffect, useState} from "react";
import {AppBar, Box, Tab, Tabs} from "@material-ui/core";
import {makeStyles, Theme} from '@material-ui/core/styles';
import {a11yProps, TabPanel} from "./TabPanel";
import {TemperaturePanel} from "./TemperaturePanel";
import {Stopwatch} from "./Stopwatch";
import {ProcessPanel} from "./ProcessPanel";
import {apiUrl} from "./api";
import {Data} from "./models/data";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export function Dashboard() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [data, setData] = useState<Data>({
        measured_temperature: 0,
        process: "No set yet",
        target_temperature: 57,
        timestamp: ""
    });
    const [isInitialized, setIsInitialized] = useState(false);

    const getData = async () => {
        const res = await fetch(`${apiUrl}/data`);
        return res.json() as Promise<Data>;
    }

    useEffect(() => {
        if (isInitialized) {
            return;
        }
        setIsInitialized(true);
        setInterval(() => {
            getData().then(setData);
        }, 1000)

    }, []);


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
                    <ProcessPanel data={data}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TemperaturePanel data={data}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Stopwatch/>
                </TabPanel>
            </div>
        </Box>
    );
}
