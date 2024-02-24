import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import {
    Button, Card, InputLabel, MenuItem, Select, SelectChangeEvent, TextField
} from '@mui/material';

import { Ticket } from '../types';

const options = ['New', 'In Progress','Resolved']

interface EditData {
  response: string;
  status: string;
}

const TicketPage = () => {
    const {id} = useParams();

    const navigate = useNavigate();
    const location = useLocation()
    const [ticket, setTicket] = useState<Ticket | null>(null)

    const [editData, setEditData] = useState<EditData>({
      response: '',
      status: '',
    });

    const handleInputChange = (e:  SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
      const { name, value } = e.target;
      setEditData(prevState => ({
          ...prevState,
          [name as string]: value
      }));
  };

    useEffect(() => {
          const fetchData = async () => {
          
            try {
              const response = await axios.get(`/api/tickets/${id}`, {
                headers: {
                  'Authorization': location.state.id   
                }
              })
              return response.data; 
            } catch (error) {
              console.error('Error fetching a ticket:', error);
              navigate('/')
              return []; 
            }
          }
      
          const getData = async () => {
            const data = await fetchData();
            setTicket(data);
          }
          getData();
        }, []);


        const handleTicketSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
           
            try {
                const data = await axios.patch(`/api/tickets/${id}`, editData,   
                {
                  headers: {
                    'Authorization': location.state.id
                  }
                });
                
                console.log(`Would normally send email here with body: ${editData.response}`)
                navigate('/tickets', {state:{id: location.state.id}})
                return data
            } catch (error) {
                console.error('Error_Message:', error);
            }

        }
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ marginRight: '30px' }}>Edit Ticket Page</h1>
              <Link to='/tickets' state={{ id: location.state.id }}>
                <Button variant='contained' color='primary'>Back</Button>
              </Link>
            </div> 
            <Card style={{ width: '400px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent:'space-evenly'  }} variant='outlined'>
                <p><strong>Name:</strong> {ticket?.name}</p>
                <p><strong>Email:</strong> {ticket?.email}</p>
                <p><strong>Description:</strong> {ticket?.description}</p>
                <form onSubmit={handleTicketSubmit}>
                  <InputLabel>Response: </InputLabel>
                  <TextField name='response' label='Enter response' multiline rows={3} fullWidth onChange={handleInputChange} value={editData.response}/>
                  <InputLabel>Status: </InputLabel>
                  <Select name='status' defaultValue='' fullWidth onChange={handleInputChange} value={editData.status}>
                    {options.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                  <Button type='submit' variant='contained' color='primary'>Submit</Button>
                </form>        
            </Card>
        </>
    )
}

export default TicketPage

