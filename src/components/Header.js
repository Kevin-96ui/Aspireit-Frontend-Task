import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ButtonAppBar = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    toast.success('Logout successfully');
    alert("Logout Successfully. See you Again!");
    navigate('/');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemText primary="Home" onClick={() => navigate('/dashboard')} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Profile" onClick={() => navigate('/userprofile')} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ToastContainer />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {loggedInUser && `Welcome, ${loggedInUser.username}`}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>
    </Box>
  );
};

export default ButtonAppBar;
