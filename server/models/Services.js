import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    SID: {
      type: String,
      require: true,
      min: 2,
      max: 50,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    category: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    serviceName: {
      type: String,
      max: 30,
    },
    serviceTime: { Start: String, End: String },
    breakTime: { Start: String, End: String },
    appoinmentTime: String,
    location: {
      state: { type: String },
      district: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
    chartData: {},
    description: String,
    appointmentList: [
      {
        AID: { type: String, unique: true },
        name: { type: String },
        email: { type: String },
        contactNumber: { type: String },
        dateTime: {
          date: { type: String },
          time: { type: String },
        },
        message: { type: String },
        status: { type: Number, default: 0 },
        bookedOn: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Services", serviceSchema);
