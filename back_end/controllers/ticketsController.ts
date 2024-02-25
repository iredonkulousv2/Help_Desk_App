import { Request, Response } from 'express';

import prisma from '../utils/db';

const createTicket = async (req: Request, res: Response ) => {

   const {name,email,description} = req.body
    const newTicket = await prisma.ticket.create({
        data: {
            name,
            email,
            description
        }
    })

    res.json(newTicket).status(200)
}


const getAllTickets = async (req: Request, res: Response) => {
    
    try {
        const allTickets = await prisma.ticket.findMany();
        
        if (!allTickets || allTickets.length === 0) {
            return res.json({ message: 'No Tickets found.' });
        }

        res.json(allTickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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

        res.json(ticket);
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

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const updatedTicket = await prisma.ticket.update({
            where: {
                id: parseInt(id)
            },
            data: {
       
                status: status,
                response: response
            }
        });

        res.json(updatedTicket);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = {
    getAllTickets,
    createTicket,
    getTicketById,
    editTicket
}