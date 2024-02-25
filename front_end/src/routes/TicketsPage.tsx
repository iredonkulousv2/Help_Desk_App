import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import TicketCard from '../components/TicketCard';
import { Ticket } from '../types';

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const navigate = useNavigate()
  const location = useLocation();
   
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/tickets`, {
          headers: {
            'Authorization': location.state?.id
          }
        })
        return response.data; 
      } catch (error) {
        console.error('Error fetching tickets:', error);
        navigate('/')
      }
    }

    const getData = async () => {
      const data = await fetchData();
      setTickets(data);
    }

    getData();
  }, [location.state?.id, navigate]);


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'  }}>
        <Link to='/'>
          <Button variant='contained' color='primary'>Log Out</Button>
        </Link>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tickets.length > 0 ? tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
        )) : <h1>No Tickets to display</h1>}
    </div>
    </>
  )
}

export default TicketsPage