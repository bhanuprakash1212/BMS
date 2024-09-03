import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import logo from "../assets/logo.png"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const drawerWidth = 240;

export default function Sidebar() {
  const location = useLocation();

  const getActiveStyle = (path) => {
    return location.pathname === path ? { backgroundColor: '#313444',width:"200px",marginLeft:"20px",borderRadius:"10px",marginBottom:"10px" } : {width:"200px",marginLeft:"20px",marginBottom:"10px"};
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: "#181f32" },
      }}
    >
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"10px",paddingLeft:"20px",paddingRight:"60px"}}>
        <img src={logo} alt="" height={"80px"}width={"80px"}/>
        <h3 style={{color:"white"}}>SYSTEM</h3>
      </div>
      <Divider sx={{ backgroundColor: "grey" ,width:"90%",marginLeft:"10px",marginBottom:"10px"}} />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/" sx={getActiveStyle('/')}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/upgrade" sx={getActiveStyle('/upgrade')}>
            <ListItemIcon>
              <InfoIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Upgrade" sx={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/event" sx={getActiveStyle('/event')}>
            <ListItemIcon>
              <AppsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Events" sx={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/settings" sx={getActiveStyle('/settings')}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/upload" sx={getActiveStyle('/upload')}>
            <ListItemIcon>
              <PersonAddAlt1Icon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Upload" sx={{ color: "white" }} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
