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
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    enum: ['usa', 'canada', 'uk', 'australia', 'germany'],
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ['truck', 'bus', 'van', 'car', 'motorcycle'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Driver = models.Driver || model("Driver", DriverSchema)

export default Driver;
