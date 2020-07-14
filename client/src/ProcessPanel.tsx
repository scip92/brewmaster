import React, { useState } from "react"
import { Box, Paper, Typography, TextField, Button } from "@material-ui/core"
import { apiUrl } from "./api";

export function ProcessPanel(props: { currentProcess: string }) {

  const [processToSave, setProcessToSave] = useState("Not set yet");

  const saveProcess = () => {
    fetch(
      `${apiUrl}/process`,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "new_value": processToSave }), method: "post"
      })
  }

  return <>
    <Box width="100%">
      <Paper elevation={3} color="secondary">
        <Box display="flex" justifyContent="center">
          <Typography variant="h4">{props.currentProcess}</Typography>
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
        onClick={saveProcess}
        color="primary"
        variant="contained"
      >
        Set
            </Button>
    </Box>
  </>
}