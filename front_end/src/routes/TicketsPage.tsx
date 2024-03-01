import DashboardBar from '../components/DashboardBar';
import TicketContainer from '../components/TicketContainer';
import {useState} from 'react'

const TicketsPage = () => {

  const [selectedStatus, setSelectedStatus] = useState<string>('New');
  return (
    <>
      <DashboardBar setSelectedStatus={setSelectedStatus}/>
      <TicketContainer selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
    </>
  )
}

export default TicketsPage