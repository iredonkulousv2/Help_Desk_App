import {Box, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const Sidebar = ({ handleStatusChange }) => {

    const handleClick = (status: string) => {
        handleStatusChange(status);
      };

  return (
    <Box sx={{ display: 'flex', height: '100vh', border: '1px solid #ccc' }}>
      <div className="sidebar-content" style={{ width: '240px', height: '100%', overflow: 'auto'  }} >
        
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['New','In Progress', 'Resolved', 'All'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => handleClick(text)}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </div>
    </Box>
  );
};

export default Sidebar;
