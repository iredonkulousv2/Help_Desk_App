import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
import { Ticket } from '../types';
import StatusCard from './StatusCard';
import SideBar from './Sidebar';

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
          <div style={{ display: 'flex', flexDirection: 'row',  backgroundColor: '#e0e0e0',maxHeight: '10rem', width: '100%' }}>
            <StatusCard status='New' count={newTickets.length} color='#b71c1c'/>
            <StatusCard status='In Progress' count={inProgressTickets.length} color='orange'/>
            <StatusCard status='Resolved' count={resolvedTickets.length} color='#2e7d32'/> 
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e0e0e0', height:'100%' }}>
          {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
                      <TicketCard key={ticket.id} ticket={ticket} getData={getData} />
                    )) : <h1>No {selectedStatus === 'All' ? '' : selectedStatus} Tickets To Display</h1>}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketContainer;
