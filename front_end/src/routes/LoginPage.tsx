import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, TextField } from '@mui/material';

interface LoginData {
    user: string;
    password: string;
  }


const LoginPage = () => {

    const [loginData, setLoginData] = useState<LoginData>({
        user: '',
        password: '',
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const navigate = useNavigate();
    
    const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
   
        try {
            const response = await axios.post('api/login', loginData); 
            // console.log('sessionId',response.data.sessionId)
            if(!response.data.sessionId){
                navigate('/')
            } else {
                navigate('/tickets', {state:{id: response.data.sessionId}})
            }
            }
        catch (error) {
            console.error('Error_Message:', error);
        }  
    }

    return (

        <div style={{ display: 'flex',  height: '100vh' }}>
            <Card variant='outlined' style={{ padding: '2rem', minWidth: '300px', maxWidth: '400px' }}>
                <h2>Login Page</h2>
                <form onSubmit={handleLogIn}>
                    <TextField name='user' label='Username' placeholder='Enter Username' fullWidth margin='normal' variant='outlined' value={loginData.user} onChange={handleInputChange}/>
                    <TextField name='password' label='Password' type='password' placeholder='Enter Password' fullWidth margin='normal' variant='outlined' value={loginData.password} onChange={handleInputChange}/>
                    <Button type='submit' variant='contained' color='primary' fullWidth>
                        Log In
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default LoginPage