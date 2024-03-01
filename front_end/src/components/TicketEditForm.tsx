import axios from 'axios';
import { ChangeEvent, FormEvent, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, InputLabel, MenuItem, Select, TextField, Box, IconButton, SelectChangeEvent, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TicketEditFormProps, EditData } from '../types';


const TicketEditForm: React.FC<TicketEditFormProps> = ({ ticket, closeModal, getData }) => {
    const { id } = ticket
    const location = useLocation();
    const [editData, setEditData] = useState<EditData>({
      response: '',
      status: ticket.status,
    });

  const handleInputChange = (e:  SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setEditData(prevState => ({
      ...prevState,
      [name as string]: value
    }));
  };
  
  const handleTicketSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    try {
      const data = await axios.patch(`/api/tickets/${id}`, editData,   
      {
        headers: {
          'Authorization': location.state.id
        }
      });
      
      console.log(`Would normally send email here with body: ${editData.response}`);
      getData()
      closeModal()
      return data;
    } catch (error) {
      console.error('Error_Message:', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 3,
        minWidth: '20rem',
        maxWidth: '30rem',
        maxHeight: '90%',
        borderRadius: 4,
        backgroundColor: '#e3f2fd',
        overflowY: 'auto'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1>Edit Ticket {ticket.id}</h1>
        <IconButton color="primary" onClick={closeModal}>
          <CloseIcon style={{ color: '#42a5f5' }} />
        </IconButton>
      </div> 
      <Card style={{ width: '20rem', padding: '1rem', display: 'flex', flexDirection: 'column',  justifyContent: 'space-between', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} variant='outlined'>
        <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <Typography variant="body1">
            <strong>Name:</strong> {ticket?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {ticket?.email}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong>
            <div style={{ maxHeight: '7rem', overflowY: 'auto', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '5px', width: '90%' }}>
              {ticket?.description}
            </div>
          </Typography>
        </div>

        <form onSubmit={handleTicketSubmit} style={{ width: '90%' }}>
         
          <TextField name='response' label='Response' multiline rows={4} fullWidth required onChange={handleInputChange} value={editData.response} style={{ marginBottom: '1rem' }} />
          <InputLabel>
            <strong>Status</strong>
          </InputLabel>
          <Select 
            name='status' 
            fullWidth 
            required 
            onChange={handleInputChange} 
            value={editData.status} 
            style={{ marginBottom: '2rem' }}
          >
           
              {['New', 'In Progress', 'Resolved']
                .map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))
              }
          </Select>
          <Button type='submit' variant='contained' color='primary'>Submit</Button>
        </form> 

      </Card>
    </Box>
  );
};

export default TicketEditForm;