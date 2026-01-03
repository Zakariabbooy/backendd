const express = require('express');
const router = express.Router();
const {
	createReservation,
	getReservations,
	getReservationById,
	updateReservation,
	deleteReservation
} = require('../controllers/reservationController');

// Create reservation
router.post('/', createReservation);

// Get list (optionally filter by user via ?user=userid)
router.get('/', getReservations);

// Get single reservation
router.get('/:id', getReservationById);

// Update reservation (partial)
router.put('/:id', updateReservation);

// Delete reservation
router.delete('/:id', deleteReservation);

module.exports = router;
