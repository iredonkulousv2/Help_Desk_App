import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
import { Ticket } from '../types';
import StatusCard from './StatusCard';
import SideBar from './Sidebar';
import { Typography } from '@mui/material';

const TicketContainer = ({selectedStatus, setSelectedStatus}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      const response = await axios.get(`api/tickets`, {
        headers: {
          'Authorization': location.state?.id
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      navigate('/');
    }
  };

  const getData = async () => {
    const data = await fetchData();
    setTickets(data);
  };

  useEffect(() => {
    getData();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const newTickets = tickets.filter(ticket => ticket.status === 'New');
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'In Progress');
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resolved');

  const filteredTickets = selectedStatus === 'All' ? tickets : tickets.filter(ticket => ticket.status === selectedStatus);


  return (
    <>
      <div style={{ display: 'flex' }}>

      {!isMobile && <SideBar setSelectedStatus={setSelectedStatus} />}

        <div style={{ display: 'flex', flexDirection: 'column', flex: '1', minHeight: '100vh' }}>
          <div style={{ display: 'flex', flexDirection: 'row',  backgroundColor: '#e3f2fd',maxHeight: '10rem', width: '100%' }}>
            <StatusCard status='New' count={newTickets.length} color='#ab47bc'/>
            <StatusCard status='In Progress' count={inProgressTickets.length} color='#ce93d8'/>
            <StatusCard status='Resolved' count={resolvedTickets.length} color='#f3e5f5'/> 
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e3f2fd', height:'100%' }}>
          {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} getData={getData} />
                    )) : 
              <Typography variant="h3"  style={{ color: '#708090' }}>
                  No {selectedStatus === 'All' ? '' : selectedStatus} Tickets To Display
              </Typography>
              }
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketContainer;
