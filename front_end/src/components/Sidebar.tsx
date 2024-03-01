import {Box, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import QueueIcon from '@mui/icons-material/Queue';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';


const Sidebar = ({ setSelectedStatus }) => {

    const handleClick = (status: string) => {
        setSelectedStatus(status);
      };

  return (
    <Box sx={{ display: 'flex', height: '100%', border: '1px solid #ccc' }}>
      <div className="sidebar-content" style={{ width: '240px', height: '100vh', overflow: 'auto'  }} >
        
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['New','In Progress', 'Resolved', 'All'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => handleClick(text)}>
                <ListItemButton>
                  <ListItemIcon>
                    {index < 2 ? <QueueIcon /> : <CheckBoxIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
              <Link to='/' style={{ textDecoration: 'none', color: '#555' }}>
                <ListItem  disablePadding >
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Log Out'} />
                  </ListItemButton>
                </ListItem>
              </Link>
            
          </List>
        </Box>
      </div>
    </Box>
  );
};

export default Sidebar;
