import React, {  } from 'react';
import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Dashboard } from './Dashboard';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Brewmaster</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Dashboard />
      </Container>
    </>
  );
}

export default App;
