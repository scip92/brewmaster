import React, { useState, useEffect } from "react"
import { Box, Paper, Typography, Button, TextField } from "@material-ui/core"

export function Stopwatch() {

  const [startTime, setstartTime] = useState(new Date().getTime())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [duration, setDuration] = useState(2000)
  const [isRunning, setIsRunning] = useState(true)

  const millisecondsToString = (ms: number) => {
    return new Date(ms).toISOString().slice(14, -3);
  }

  useEffect(() => {
    setInterval(() => {
      const newTimeElapsed = new Date().getTime() - startTime
      setTimeElapsed(newTimeElapsed);
    }, 10)
  }, [startTime]);

  return <>
    <Box width="100%">
      <Paper elevation={3} color="secondary">
        <Box display="flex" justifyContent="center" bgcolor="primary">
          <Typography variant="h2">{(duration < timeElapsed) ? "Finished" : millisecondsToString(duration - timeElapsed)}</Typography>
        </Box>
      </Paper>
    </Box>
    <Box width="100%" marginTop={4} display="flex" justifyContent="center" alignItems="center">
      <TextField
        id="outlined-basic"
        label="Timer Duration"
        variant="outlined"
        value={duration}
        type="number"
        onChange={(e) => setDuration(parseInt(e.target.value))}
      />
      <Button color="primary" variant="contained" >Set</Button>
    </Box>
    <Box marginTop={4} width="100%" display="flex" justifyContent="center">
      <Button
        style={{ minWidth: '16rem' }}
        color="primary"
        variant="contained"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? "Pause" : "Start"}
      </Button>
    </Box>
  </>
}