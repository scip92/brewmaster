import React, { useState } from 'react';
import './App.css';
import { Container, AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Dashboard } from './pages/Dashboard';
import { Sidebar } from './shared/Sidebar';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <AppBar position="static">
        <Toolbar>
          <Box marginRight={2}>
            <MenuIcon onClick={() => setIsOpen(true)} />
          </Box>
          <Typography variant="h4">Brewmaster</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route path="/settings">
            <h1>Hello Settings</h1>
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
