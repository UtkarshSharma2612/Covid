require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserSchema = require("./models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VaccinationCentreSchema = require("./models/centres.model");
const { db } = require("./models/user.model");
const { response } = require("express");
const AppointmentModel = require("./models/appointments.model");

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
    const user = await UserSchema.create({
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
  const user = await UserSchema.findOne({
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
      return res.json({ status: "ok", user: true });
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
    const center = await VaccinationCentreSchema.create({
      name: req.body.name,
      address: req.body.address,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "error" });
  }
});

// Delete Vaccination Center
app.post("/api/delete", async (req, res) => {
  //console.log("hello");
  const vcenter = await VaccinationCentreSchema.findOne({
    id: req.body.id,
  });
  //console.log(req.body);
  const result = await VaccinationCentreSchema.deleteOne({ _id: req.body.id });
  //console.log(result);
  res.send(result);
});

// get mongodb data on the frontend.
app.get("/api/list", async (req, res) => {
  const users = await VaccinationCentreSchema.find({});
try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


 // admin login page 

 app.post("/api/adminlogin", async (req,res) => {
  const detail = await ({
        email :  req.body.email,
        password : req.body.password
  })
      if(detail.email=== "admin@gmail.com" && detail.password==="admin123")
      {
        return res.json({ status: "ok", user: true });
      }
      else 
        return res.json({ status: "error", user: false });
 })



 // user search bar
 app.get("/api/search", async (req, res) => {
  const users = await VaccinationCentreSchema.find({});
try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/api/appointment", async(req,res) =>{

  const booking = await AppointmentModel.create({
    name : req.body.name,
    date : req.body.date
  });
       
  })









app.listen(1337, () => {
  console.log("Server started on 1337");
});
