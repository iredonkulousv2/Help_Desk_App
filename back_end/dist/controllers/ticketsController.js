"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, description } = req.body;
    const newTicket = yield prisma.ticket.create({
        data: {
            name,
            email,
            description
        }
    });
    //console.log('created new Ticket', newTicket)
    console.log('body', req.body);
    res.json(newTicket).status(200);
});
const getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTickets = yield prisma.ticket.findMany();
        if (!allTickets || allTickets.length === 0) {
            return res.json({ message: 'No Tickets found.' });
        }
        res.json(allTickets);
    }
    catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ticket = yield prisma.ticket.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    }
    catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const editTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, response } = req.body;
    try {
        const ticket = yield prisma.ticket.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        const updatedTicket = yield prisma.ticket.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: status,
                response: response
            }
        });
        res.json(updatedTicket);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = {
    getAllTickets,
    createTicket,
    getTicketById,
    editTicket
};
//# sourceMappingURL=ticketsController.js.map