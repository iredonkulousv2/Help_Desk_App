import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogOutButton from './LogOutButton';


const DashboardBar = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <AdminPanelSettingsIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }}>
            Admin Dashboard
          </Typography>
          <LogOutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardBar;
