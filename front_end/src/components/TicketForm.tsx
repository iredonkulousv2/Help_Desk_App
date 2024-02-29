import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, TextField, Typography } from '@mui/material';

interface FormData {
  name: string;
  email: string;
  description: string;
}

const TicketForm = () => {

  const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        description: ''
      });

  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [isValidEmail,setIsValidEmail] = useState(true)
   
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const checkValidEmail = (email) => {
        const pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        return pattern.test(email);
      };
    
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 
        if(!checkValidEmail(formData.email)){
          setIsValidEmail(false)
          return
        }

        setIsValidEmail(true)
        
        try {
          const response = await axios.post('/api/tickets', formData);
          setFormData({
            name: '',
            email: '',
            description: ''
          })
          setSubmitSuccess(true);
          console.log(`submitted form sucessfully with ${response}`)
        } catch (error ) {
          console.error('Error submitting ticket:', error);
        }
      };

    return (
        <Card variant="outlined" style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
          <Typography variant="h4" gutterBottom>
            Support Ticket Form
          </Typography>
          <form id="ticket-form" role="enter ticket" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              placeholder="Enter Name"
              fullWidth
              margin="normal"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              type="email"
              placeholder="Enter Email"
              fullWidth
              margin="normal"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
              {!isValidEmail && (
              <Typography variant="body1" style={{ color: 'red', marginBottom: '10px' }}>
                Please submit a valid email
              </Typography>
            )}
            <TextField
              label="Description of Problem"
              placeholder="Enter Description of problem"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
              {submitSuccess && (
              <Typography variant="body1" style={{ color: 'green', marginBottom: '10px' }}>
                Ticket Submitted successfully
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
          <Button component={Link} to="/login" variant="text" color="primary" fullWidth style={{ marginTop: '10px' }}>
            Log In as Admin
          </Button>
      </Card>
    )
}

export default TicketForm