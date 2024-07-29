import { Schema, models, model } from "mongoose";

const fatigueWarningSchema = new Schema({
    deviceId: {
        type: String,
        required: true,
      },
    timestamp: { type: Date, default: Date.now },
    warning: { type: Number, required: true }
  });

  const Warnings = models.Warnings || model("Warnings", fatigueWarningSchema);

export default Warnings;