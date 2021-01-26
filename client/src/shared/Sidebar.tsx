import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {
    Box,
    ButtonBaseProps,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import { Link, LinkProps } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

export type SidebarProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar(props: SidebarProps): JSX.Element {

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event && event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab'
            || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        props.setIsOpen(open);
    };

    function HomeLink(props: ButtonBaseProps) {
        return <Link to="/" {...props as Omit<LinkProps, "to">} />;
    }

    function SettingsLink(props: ButtonBaseProps) {
        return <Link to="/settings" {...props as Omit<LinkProps, "to">} />;
    }

    return (
      <SwipeableDrawer
        anchor='left'
        open={props.isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
          <Box width={250}>
              <Box ml={2} mt={2}>
                  <Typography variant="h4">Menu</Typography>
              </Box>
              <List>
                  <ListItem button onClick={() => props.setIsOpen(false)} component={HomeLink}>
                      <ListItemIcon><HomeIcon/></ListItemIcon>
                      <ListItemText primary='Home'/>
                  </ListItem>
                  <Divider/>
                  <ListItem button onClick={() => props.setIsOpen(false)} component={SettingsLink}>
                      <ListItemIcon><SettingsIcon/></ListItemIcon>
                      <ListItemText primary='Settings'/>
                  </ListItem>
                  <Divider/>
              </List>
          </Box>
      </SwipeableDrawer>
    );
}