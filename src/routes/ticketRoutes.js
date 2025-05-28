import { Router } from 'express';

import {
  createTicket,
  listTicket,
  listTicketById,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController.js';

const router = Router();

router.post('/', createTicket);
router.get('/', listTicket);
router.get('/:id', listTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

export default router;
