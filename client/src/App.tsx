import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Dashboard } from './Dashboard';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3">Brewmaster</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Dashboard />
      </Container>
    </>
  );
}

export default App;
