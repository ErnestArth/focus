import { Schema, models, model } from "mongoose";
const VehicleSchema = new Schema({
   
  
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vehicle = models.Vehicle || model("Vehicle", VehicleSchema)

export default Vehicle;


