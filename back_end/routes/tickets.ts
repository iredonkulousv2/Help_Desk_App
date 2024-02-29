import express from 'express'
const router = express.Router();
const ticketsController = require('../controllers/ticketsController')
import isAdmin from '../middleware/isAdmin'

router.route('/')
    .get(isAdmin, ticketsController.getAllTickets)
    .post(ticketsController.createTicket)

router.route('/:id')
    .get(isAdmin,ticketsController.getTicketById)
    .patch(isAdmin,ticketsController.editTicket)
    .delete(isAdmin,ticketsController.deleteTicketById)

module.exports = router;