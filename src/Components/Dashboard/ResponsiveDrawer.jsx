import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import { Button, Grid } from "@mui/material";
import { Switch, Route, Link, useRouteMatch,useLocation, useHistory, } from "react-router-dom";
import Team from "./Team";
import Ticket from './Ticket';
import AssignTicket from "./AssignTicket";
import ManagerRoute from '../ManagerRoute/ManagerRoute';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { currentUser, user,logOut,manager } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const history = useHistory();

  let { path, url } = useRouteMatch();

  const drawer = (
    <div>
      <Box sx={{ ml: 2, mb:1 }}>
        <Typography>Name: {currentUser?.displayName}
        <Button onClick={()=>logOut(history)} >
                  logout
                 </Button>
        </Typography>
        <Typography>Team Name: {currentUser?.team}</Typography>
      </Box>
      
      <Toolbar />
      
      <Link to={`${url}`} style={{ textDecoration: 'none', color:'#1769aa' }}>
     
      <Box sx={{
        backgroundColor: '',
        '&:hover': {
          backgroundColor: '#e0e0e0',
          opacity: [0.9, 0.8, 0.7],
        },
        p:1,
        m:1
      }}>
         <span style={{marginLeft: '4em'}}> My Team</span>
      </Box>
     
      </Link>
      <Link to={`${url}/ticket`} style={{ textDecoration: 'none', color:'#1769aa' }}>
     
      <Box sx={{
        backgroundColor: '',
        '&:hover': {
          backgroundColor: '#e0e0e0',
          opacity: [0.9, 0.8, 0.7],
        },
        p:1,
        m:1
      }}>
         <span style={{marginLeft: '4em'}}> Ticket </span>
      </Box>
     
      </Link>
     {
       currentUser?.role == 'manager' &&
       <Link to={`${url}/assign`} style={{ textDecoration: 'none', color:'#1769aa' }}>
     
       <Box sx={{
         backgroundColor: '',
         '&:hover': {
           backgroundColor: '#e0e0e0',
           opacity: [0.9, 0.8, 0.7],
         },
         p:1,
         m:1
       }}>
          <span style={{marginLeft: '4em'}}> Assign Ticket </span>
       </Box>
      
       </Link>
     }

    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          pb:1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
       <Switch>
           <Route  exact path={path}>
                <Team/>
           </Route>
           <Route  path={`${path}/ticket`}>
              <Ticket />
           </Route>
           <ManagerRoute  path={`${path}/assign`}>
             <AssignTicket />
           </ManagerRoute>


       </Switch>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
