const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    cid: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    datetime: { type: Date, require: true },
    // AadharID: {type: String, required: true}
  },
  { collection: "appointments" }
);

const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);
module.exports = AppointmentModel;
