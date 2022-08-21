require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VaccinationCentreModel = require("./models/centres.model");
const { db } = require("./models/user.model");
const { response } = require("express");
const AppointmentModel = require("./models/appointments.model");
const dayjs = require("dayjs");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect(process.env.MONGO_DB_URI),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// console.log(process.env.MONGO_DB_URI)

mongoose.connection.once("open", () => {
  console.log("connected to db");
});
app.get("/api/check", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running...",
  });
});

// Register Page backend

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});
async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

// Login Page Backend
app.post("/api/login", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (user) {
    if (await comparePassword(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } else {
    return res.json({ status: "error", user: false });
  }
});
async function comparePassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

// Add Vaccination center
app.post("/api/addCenter", async (req, res) => {
  try {
    const center = await VaccinationCentreModel.create({
      name: req.body.name,
      address: req.body.address,
      doses: req.body.doses,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "error" });
  }
});

// Delete Vaccination Center
app.post("/api/delete", async (req, res) => {
  //console.log("hello");
  const vcenter = await VaccinationCentreModel.findOne({
    id: req.body.id,
  });
  //console.log(req.body);
  const result = await VaccinationCentreModel.deleteOne({ _id: req.body.id });
  //console.log(result);
  res.send(result);
});

// get mongodb data on the frontend.
app.get("/api/list", async (req, res) => {
  const users = await VaccinationCentreModel.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// admin login page

app.post("/api/adminlogin", async (req, res) => {
  const detail = await {
    email: req.body.email,
    password: req.body.password,
  };
  if (detail.email === "admin@gmail.com" && detail.password === "admin123") {
    return res.json({ status: "ok", user: true });
  } else return res.json({ status: "error", user: false });
});

// This is function to check and update appoint

app.post("/api/appointment", async (req, res) => {
  // const check = await VaccinationCentreModel.findOne({
  //   doses: req.body.doses
  // });
  // check.doses = check.doses - 1
  // const appointment= await AppointmentModel.create({
  //   name: name.req.body,
  //   AadharID:AadharID.req.body,
  //   });

  // get all appointments for requested date using cid
  const datetimestring = req.body.datetime;
  const cid = req.body.cid;
  const name = req.body.name;

  const startTime = dayjs(datetimestring).startOf("day");
  const endTime = dayjs(datetimestring).endOf("day");

  const bookedAppointments = await AppointmentModel.find({
    cid: new mongoose.Types.ObjectId(cid),
    datetime: { $gte: startTime.toISOString(), $lte: endTime.toISOString() },
  });
  if (bookedAppointments.length < 10) {
    await AppointmentModel.create({
      cid,
      datetime: dayjs(datetimestring).toISOString(),
      name,
    });
    res.json({ status: "ok" });
  } else {
    // throw error
    res.json({ status: "error", message: "Not slots available for today" });
  }
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});
