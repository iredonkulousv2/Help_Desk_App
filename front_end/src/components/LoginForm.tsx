import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,  TextField, Avatar, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { LoginData } from '../types';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    user: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

 
  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
        const response = await axios.post('api/login', loginData); 
        
        if(!response.data.sessionId){
            navigate('/')
            return
        } 

        navigate('/tickets', {state:{id: response.data.sessionId}})
        }
    catch (error) {
        console.error('Error_Message:', error);
    }  
  }

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogIn} sx={{ mt: 1 }}>
              <TextField 
                name='user' 
                label='Username' 
                placeholder='Enter Username' 
                fullWidth margin='normal' 
                variant='outlined' 
                autoFocus
                required
                value={loginData.user} 
                onChange={handleInputChange}/>
              <TextField 
                margin='normal' 
                name='password' 
                label='Password' 
                type='password' 
                required
                placeholder='Enter Password' 
                fullWidth variant='outlined' 
                value={loginData.password} 
                onChange={handleInputChange}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
          
              <Typography variant="body2" color="text.secondary" align="center" >
                {'Copyright © '}
                <Link color="inherit" href="https://help-desk-app.fly.dev/">
                    Help-Desk App
                </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginForm