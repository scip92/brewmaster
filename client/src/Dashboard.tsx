import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@material-ui/core';

export function Dashboard() {
    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        async function getTemperature() {
            const res = await fetch("http://localhost:5000/temperature");
            res.json().then(res => setTemperature(res));
        }
        getTemperature();
    }, [])

    return (
        <Box marginTop={2}>
            <Typography variant="h3">
                Current Termperature: {temperature}
            </Typography>
        </Box>
    );
}