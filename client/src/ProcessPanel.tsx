import React, {useState, useEffect} from "react"
import {Box, Paper, Typography, TextField, Button} from "@material-ui/core"
import {apiUrl} from "./api";
import {Data} from "./models/data";

export function ProcessPanel(props: { data: Data }) {

    const [processToSave, setProcessToSave] = useState("");

    useEffect(() => {
        fetch(`${apiUrl}/process`).then(res => res.json()).then(response => setProcessToSave(response));
    }, [])

    const saveTargetTemperature = () => {
        fetch(
            `${apiUrl}/process`,
            {
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"new_value": processToSave}), method: "post"
            })
            .then(res => res.json())
            .then(response => setProcessToSave(response));
    }

    return <>
        <Box width="100%">
            <Paper elevation={3} color="secondary">
                <Box display="flex" justifyContent="center">
                    <Typography variant="h4">{props.data.process}</Typography>
                </Box>
            </Paper>
        </Box>
        <Box width="100%" marginTop={4} display="flex" justifyContent="center" alignItems="center">
            <TextField
                id="outlined-basic"
                label="Process name"
                variant="outlined"
                value={processToSave}
                type="string"
                onChange={(e) => setProcessToSave(e.target.value)}
            />
            <Button
                onClick={saveTargetTemperature}
                color="primary"
                variant="contained"
            >
                Set
            </Button>
        </Box>
    </>
}