import React, { useState } from 'react';
import { Typography, Button, Modal, IconButton, CardContent, Paper } from '@mui/material';
import TicketEditForm from './TicketEditForm';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close'
import { useLocation } from 'react-router-dom';
import { TicketCardProps } from '../types';


const TicketCard: React.FC<TicketCardProps> = ({ ticket, getData }) => {
  const { id: ticketId, name, email, description, status, response } = ticket;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const location = useLocation();

  const statusStyle = {
    color: status === 'Resolved' ? 'green' : status === 'In Progress' ? 'orange' : 'red',
  };

  const shortenText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + ' ...';
    }
    return text;
  };

  const handleDelete = async (id: string) => {
    try {
      const data = await axios.delete(`/api/tickets/${id}`,    
      {
        headers: {
          'Authorization': location.state.id
        }
      });
      getData()
      return data;
    } catch (error) {
      console.error('Error_Message:', error);
    }
  }
  
  return (
    <>
      <Paper
        elevation={3}
        style={{
          margin: '1rem',
          minWidth: '350px',
          maxWidth: '350px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: '0.3s',
          borderRadius: '8px',
          background: '#ffffff',
          maxHeight: '19rem',
          position: 'relative',
        }}
      >
       
        <CardContent >
          <Typography variant="body1" style={{ color: '#666', marginBottom: '0.5rem', overflow: 'hidden'  }}>
            <strong>Name:</strong> {name}
          </Typography>
          <Typography variant="body1" style={{ color: '#666', marginBottom: '0.5rem', overflow: 'hidden'  }}>
            <strong>Email:</strong> {email}
          </Typography>
          <Typography variant="body1" style={{ color: '#666', marginBottom: '0.5rem', overflow: 'hidden',  }}>
            <strong>Description:</strong> {shortenText(description, 90)}
          </Typography>
          {response && (
            <Typography variant="body1" style={{ color: '#666', marginBottom: '0.5rem', overflow: 'hidden' }}>
              <strong>Response:</strong> {shortenText(response, 90)}
            </Typography>
          )}
          <Typography variant="body1" style={{ color: '#666' }}>
            <strong>Status:</strong>{' '}
            <span style={{ ...statusStyle, fontWeight: 'bold' }}>{status}</span>
          </Typography>
        </CardContent>
     
        <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
            <Button variant="contained" color="primary" style={{ margin: '0.5rem' }} onClick={openModal}>
              Edit
            </Button>
        </div>
        <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <IconButton onClick={() => handleDelete(ticketId)}>
              <CloseIcon style={{ color: 'red' }} />
          </IconButton> 
        </div>
      </Paper>

      <Modal open={isModalOpen} onClose={closeModal}>
        <TicketEditForm  ticket={ticket} closeModal={closeModal} getData={getData} />
      </Modal>
    </>
  );
};

export default TicketCard;