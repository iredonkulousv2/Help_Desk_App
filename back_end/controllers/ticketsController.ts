import { Request, Response } from 'express';

import prisma from '../utils/db';

const createTicket = async (req: Request, res: Response ) => {
   try {
       const { name, email, description } = req.body
        const newTicket = await prisma.ticket.create({
            data: {
                name,
                email,
                description
            }
        })
        return res.json(newTicket).status(200)

   } catch(error) {
        console.error("Error creating ticket:", error);
        return res.status(500).json({ error: "Internal server error" });
   }
}

const getAllTickets = async (req: Request, res: Response) => {
    try {
        const allTickets = await prisma.ticket.findMany();
        
        if (!allTickets || allTickets.length === 0) return res.json([]);

        return res.json(allTickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: parseInt(id) 
            }
        });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        
        return res.json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editTicket = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { status, response } = req.body; 
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        
        const updatedTicket = await prisma.ticket.update({
            where: {
                id: parseInt(id)
            },
            data: {
       
                status: status,
                response: response
            }
        });

        return res.json(updatedTicket);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const deleteTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const ticket = await prisma.ticket.delete({
        where: {
          id: parseInt(id)
        }
      });
    
      return res.status(200).json({ message: 'Ticket deleted successfully', ticket });
    } catch (error) {
      console.error('Error deleting ticket:', error);
      res.status(500).json({ error: 'Unable to delete ticket' });
    }
  }

module.exports = {
    getAllTickets,
    createTicket,
    getTicketById,
    editTicket,
    deleteTicketById
}