const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Terrain information (store snapshot to avoid relying on separate terrain collection)
  terrainId: { type: String },
  terrainName: { type: String, required: true },
  terrainAddress: { type: String },
  terrainCity: { type: String },
  pricePerHour: { type: Number, required: true },

  // Booking details
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  players: [
    {
      name: { type: String },
      email: { type: String }
    }
  ],

  // Payment and status
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['card', 'paypal', 'cash'], default: 'card' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentTransactionId: { type: String },
  cardLast4: { type: String },

  status: { type: String, enum: ['booked', 'confirmed', 'cancelled'], default: 'booked' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
