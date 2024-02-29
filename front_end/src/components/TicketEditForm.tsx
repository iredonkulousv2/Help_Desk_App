import axios from 'axios';
import { ChangeEvent, FormEvent, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, InputLabel, MenuItem, Select, TextField, Box, IconButton, SelectChangeEvent} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TicketEditFormProps, EditData } from '../types';


const TicketEditForm: React.FC<TicketEditFormProps> = ({ ticket, closeModal, getData }) => {
    const { id } = ticket
    const location = useLocation();
    const [editData, setEditData] = useState<EditData>({
      response: '',
      status: '',
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
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        minWidth: 400,
        maxWidth: '80%',
        borderRadius: 4,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ marginRight: '30px', color: '#333' }}>Edit Ticket {ticket.id}</h1>
        <IconButton color="primary" onClick={closeModal}>
          <CloseIcon style={{ color: 'red' }} />
        </IconButton>
      </div> 
      <Card style={{ width: '25rem', padding: '20px', display: 'flex', flexDirection: 'column',  justifyContent: 'space-between', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} variant='outlined'>
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <p><strong>Name:</strong> {ticket?.name}</p>
          <p><strong>Email:</strong> {ticket?.email}</p>
          <p><strong>Description:</strong></p>
          <div style={{ maxHeight: '15rem', overflowY: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {ticket?.description}
          </div>
        </div>

        <form onSubmit={handleTicketSubmit} style={{ width: '100%' }}>
          <TextField name='response' label='Response' multiline rows={5} fullWidth required onChange={handleInputChange} value={editData.response} style={{ marginBottom: '20px' }} />
          <InputLabel>Status</InputLabel>
          <Select 
            name='status' 
            fullWidth 
            required 
            onChange={handleInputChange} 
            value={editData.status === '' ? ticket.status : editData.status} 
            style={{ marginBottom: '20px' }}
          >
              {ticket.status && (
                <MenuItem value={ticket.status}>{ticket.status}</MenuItem>
              )}

              {['New', 'In Progress', 'Resolved']
                .filter(option => option !== ticket.status)
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