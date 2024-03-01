import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import useIsMobile from '../utils/useIsMobile';


const DashboardBar = ({setSelectedStatus}) => {

  const isMobile = useIsMobile();

  const handleClick = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <Box sx={{ width: '100vw' }}>
      <AppBar position="static">
        <Toolbar>
          {!isMobile ?
            <AdminPanelSettingsIcon />:
            <Link to='/' style={{ textDecoration: 'none', color: '#fff' }}>
              <LogoutIcon/>
            </Link>
          }

          {!isMobile ?
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1, fontSize: '1.2rem' }}>
            Admin Dashboard
            </Typography> : 

            <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            {['New','In Progress', 'Resolved', 'All']
              .map(text => (
                <Button variant="contained"
                color="secondary" 
                key={text}
                sx={{
                  ml: 1,
                  backgroundColor: 'transparent', 
                  border: 'none',
                  boxShadow: 'none',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                  },
                  '& .MuiButton-label': { 
                    color: 'inherit', 
                  },
                }}
                onClick={() => handleClick(text)}
                >{text}</Button>
              ))
            }
            </div>
          
        } 
         
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardBar;
