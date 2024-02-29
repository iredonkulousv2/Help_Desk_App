import {  Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LogOutButton = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ExitToAppIcon />} 
                sx={{
                  ml: 2,
                  backgroundColor: 'transparent', 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                  },
                  '& .MuiButton-label': { 
                    color: 'inherit', 
                  },
                }}
              >
                Log Out
              </Button>
            </Link>
          </div>
    )
}

export default LogOutButton