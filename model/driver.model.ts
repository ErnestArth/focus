import { Schema, models, model } from "mongoose";

const DriverSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  streetAddress: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  usertype: {
    type: String,
    required: false,
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Driver = models.Driver || model("Driver", DriverSchema);

export default Driver;
