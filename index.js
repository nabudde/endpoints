var jwt = require('jsonwebtoken');
const Joi = require("joi");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
bodyParser.json(app);

let user_account = [];
let Trips = [];
let bookings = [];


app.post("/api/v1/signup", (req, res) => {
  const schema = Joi.object().keys({
    Email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    First_name: Joi.string().alphanum().min(3).max(30).required(),
    Last_name: Joi.string().alphanum().min(3).max(30).required()
  });
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  const create_signup = {
    Email: req.body.Email,
    Password: req.body.Password,
    First_name: req.body.First_name,
    Last_name: req.body.Last_name
  };
  

user_account.push(create_signup);

    jwt.sign({create_signup}, "secretkey" ,(error,token)=>{
        res.json({
            status: "success",
            data:{
                token,
                First_name:req.body.First_name,
                Last_name: req.body.Last_name,
                Email: req.body.Email
            }
        });
    });

});



app.post("/api/v1/signin", (req, res) => {
  const schema = Joi.object().keys({
    Email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  });
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const create_signin = {
    Email: req.body.Email,
    Password: req.body.Password
  };
  const user=user_account.find(e => e.Email === req.body.Email);
  if(!user){
    return res.status(400).send("You are not signed up")
}

const value = {
    Email: user.Email,
    First_name:user.First_name,
    Last_name:user.Last_name}

    jwt.sign({create_signin}, "secretkey" ,(error,token)=>{
        res.json({
            status: "success",
            data:
                 token,
                 value
            
        });
    });

});

app.post("/api/v1/create", (req, res) => {
  const schema = Joi.object().keys({
    trip_id: Joi.number().required(),
    seating_capacity: Joi.number().required(),
    bus_license_number: Joi.number().required(),
    origin: Joi.string().alphanum().required(),
    destination: Joi.string().alphanum().required(),
    trip_date: Joi.date().required(),
    fare: Joi.number().required()
  });
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  const create_trip = {
    trip_id: req.body.trip_id,
    seating_capacity: req.body.seating_capacity,
    origin: req.body.origin,
    destination: req.body.destination,
    trip_date: req.body.trips_date,
    fare: req.body.fare
  };
  jwt.sign({Trips}, "secretkey" ,(error,token)=>{
    res.json({
        status: "success",
        data:{
            token,
            create_trip   
        }
        
    });
});
  Trips.push(create_trip);
//   res.send(create_trip);
});

app.get("/api/v1/trips", (res, req) => {
  req.json({
      status: "success",
      data: Trips
  });
});
app.get("/api/v1/trips/:trip_id", (req, res) => {
  const specificTrip = Trips.find(t => t.trip_id == req.params.trip_id);
  if (!specificTrip)
    res.status(404).send("the provided trip_id is not available");
    jwt.sign({Trips}, "secretkey" ,(error,token)=>{
        res.json({
            status: "success",
            data:{
                token,
                specificTrip   
            }
            
        });
});
});
app.delete("/api/v1/delete/:trip_id", (req, res) => {
  const tripDelete = Trips.find(t => t.trip_id == req.params.trip_id);
  if (!tripDelete)
    res.status(404).send("the provided trip_id is not available");
  const index = Trips.indexOf(tripDelete);
  Trips.splice(index, 1);
  res.json({
      status : "success",
      data : {
          message : "Trip cancelled successfully",
    }
    });
});
app.post("/api/v1/bookaseat", (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
        bus_license_number: Joi.number().required(),
        trip_date: Joi.date().required(),
        First_name: Joi.string().required(),
        Last_name: Joi.string().required(),
        user_email: Joi.string().required()
      });
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        res.status(400).send(result.error.details[0].message);
      }
  const bookASeat = {
    id: req.body.id,
    bus_license_number: req.body.bus_license_number,
    trip_date: req.body.trip_date,
    First_name: req.body.First_name,
    Last_name:req.body.Last_name,
    user_email:req.body.user_email
  };
  bookings.push(bookASeat);
  res.json({
      status:"success",
      data:{
        bookASeat}
    });
});
app.get("/api/v1/allbookings", (req, res) => {
  res.json({
      status:"success",
      data:
          bookings});
});
app.delete("/api/v1/deletebooking/:id", (req, res) => {
  const deleteBooking = bookings.find(b => b.id == req.params.id);
  if (!deleteBooking) res.status(404).send("provided id is not available");
  const Index = bookings.indexOf(deleteBooking);
  bookings.splice(Index, 1);
  res.json({
    status:"success",
    data:{
        message:"Booking deleted successfully "
    }
        });
});

app.listen(4000, () => console.log("Listening on port 4000"));
