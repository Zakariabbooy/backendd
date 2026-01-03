const Reservation = require('../models/Reservation');

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    console.log('createReservation body:', req.body);
    const {
      user,
      terrainId,
      terrainName,
      terrainAddress,
      terrainCity,
      pricePerHour,
      date,
      time,
      duration,
      players,
      paymentMethod,
      paymentTransactionId,
      cardLast4,
      totalPrice
    } = req.body;

    // NOTE: Removed strict required-fields check for local testing. Ensure payload includes important fields.

    const reservation = new Reservation({
      user,
      terrainId,
      terrainName,
      terrainAddress,
      terrainCity,
      pricePerHour,
      date,
      time,
      duration,
      players: players || [],
      paymentMethod: paymentMethod || 'card',
      paymentStatus: paymentTransactionId ? 'paid' : 'pending',
      paymentTransactionId,
      cardLast4,
      totalPrice,
      status: 'booked'
    });

    await reservation.save();
    return res.status(201).json(reservation);
  } catch (err) {
    console.error('createReservation error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get reservations (all or by user)
exports.getReservations = async (req, res) => {
  try {
    const { user } = req.query;
    const filter = {};
    if (user) filter.user = user;
    const reservations = await Reservation.find(filter).sort({ date: -1 }).lean();
    return res.json(reservations);
  } catch (err) {
    console.error('getReservations error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get single reservation by id
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id).lean();
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    return res.json(reservation);
  } catch (err) {
    console.error('getReservationById error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update reservation (partial updates)
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };
    const reservation = await Reservation.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    return res.json(reservation);
  } catch (err) {
    console.error('updateReservation error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete or cancel reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    await reservation.remove();
    return res.json({ message: 'Reservation deleted' });
  } catch (err) {
    console.error('deleteReservation error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


