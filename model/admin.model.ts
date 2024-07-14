import { Schema, models, model } from "mongoose";

const AdminSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },
  phone: {
    type: String,
    required: true,
  },
  agencyName: {
    type: String,
    required: true,
  },
  agencyAddress: {
    type: String,
    required: true,
  },
  agencyType: {
    type: String,
    enum: ['taxi', 'rideshare', 'delivery', 'other'],
    required: true,
  },
  agencySize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = models.Admin || model("Admin", AdminSchema)
export default Admin;
