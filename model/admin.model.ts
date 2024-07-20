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
  usertype: {
    type: String,
    required: false,
  },
  agencyName: {
    type: String,
    required: false,
  },
  agencyAddress: {
    type: String,
    required: false,
  },
  
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = models.Admin || model("Admin", AdminSchema)
export default Admin;
