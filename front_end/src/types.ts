export interface Ticket {
    id: string;
    name: string;
    email: string;
    description: string;
    status: string;
    response?: string;
  }

  export interface LoginData {
    user: string;
    password: string;
  }

  export interface TicketCardProps {
    ticket: Ticket;
    getData: () => void
  }

  export interface TicketEditFormProps {
    ticket: Ticket;
    closeModal: () => void;
    getData: () => void
  }
  
  export interface EditData {
      response: string;
      status: string;
    }