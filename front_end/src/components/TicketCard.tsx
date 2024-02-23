import Card from '@mui/material/Card';

import { Link, useLocation } from 'react-router-dom';
import { Ticket } from '../types';


interface TicketCardProps {
  ticket: Ticket;
}


const TicketCard: React.FC<TicketCardProps> = ({ticket}) => {
    const {id: ticketId, name,email,description,status, response} = ticket
    const {id} = useLocation().state;
   
    const statusStyle = {
      color: status !== 'Resolved' ? 'red' : 'green' 
  };

  return (
    <Card variant='outlined' style={{ margin: '2rem', width:'15rem', minWidth: '300px'}}>
      <Link to={`/tickets/${ticketId}`} state={ {id }} style={{ textDecoration: 'none', color: 'inherit' }}>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Response:</strong> {response || ''}</p>
        <p><strong>Status:</strong> <span style={statusStyle}>{status}</span></p>
    </Link>
    </Card>
  )
}

export default TicketCard