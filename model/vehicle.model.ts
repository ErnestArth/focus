import mongoose, { Schema, models, model } from "mongoose";

const VehicleSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  numberPlate: {
    type: String,
    required: false,
  },
  vehicle: {
    type: String,
    required: false,
  },
  deviceId: {
    type: String,
    required: false,
  },
  fatigueWarnings: {
    type: Number,
    required: false,
    default: 0,
  },
  status: {
    type: String,
    required: false,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Vehicle = models.Vehicle || model("Vehicle", VehicleSchema);

export default Vehicle;
