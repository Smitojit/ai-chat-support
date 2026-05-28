const express=require('express');
const router=express.Router();
const {createTicket, getAllTickets, updateTicket}=require('../controllers/ticketController');

router.post('/', createTicket);
router.get('/', getAllTickets);
router.patch('/:id', updateTicket);

module.exports=router;