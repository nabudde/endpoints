// const Joi = require('joi');
const express=require("express");
const bodyParser = require('body-parser')
const app=express();

app.use(express.json());
bodyParser.json(app)

let signup=[];
let signin=[];
let Trips=[];
let bookings=[];


app.post('/api/v1/signup',(req, res)=>{
    if(!req.body.Email){
        res.status(400).send("email is required");
        return;
    }
    if(!req.body.Password){
        res.status(400).send("password is required");
        return;
    }
    if(!req.body.first_name){
        res.status(400).send("first_name must be entered");
        return;
    }
    if(!req.body.last_name){
        res.status(400).send("last_name must be entered");
        return;
    }
    if(!req.body.is_admin ){
        res.status(400).send("this field required");
        return;    
    }
    
    const create_signup={
        Email:req.body.Email,
        Password:req.body.Password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        is_admin:req.body.is_admin
    };
    
    signup.push(create_signup);
    res.send(create_signup);
    console.log(create_signup);
});

app.post('/api/v1/signin',(req, res)=>{
    if(!req.body.Email){
        res.status(400).send("email is required");
        return;
    }
    if(!req.body.Password){
        res.status(400).send("pasword is required");
        return;
    }
    const create_signin={
        Email:req.body.Email,
        Password:req.body.Password
    };
    signin.push(create_signin);
    res.send(create_signin);
    console.log(create_signin);   
});


app.post('/api/v1/create',(req,res)=>{
    const create_trip={
        trip_id :req.body.trip_id,
        seating_capacity : req.body.seating_capacity,
        bus_license_number : req.body.bus_license_number,
        origin : req.body.origin, 
        destination : req.body.destination,
        trip_date : req.body.trips_date,
        fare : req.body.fare
    };
    Trips.push(create_trip);
    res.send(create_trip);
    console.log(create_trip);   
});

app.get('/api/v1/trips',(res,req)=>{
    req.send(Trips);

});
app.delete('/api/v1/delete/:trip_id',(req,res)=>{
    const tripDelete=Trips.find(t=>t.trip_id==(req.params.trip_id));
    if (!tripDelete) res.status(404).send('the provided trip_id is not available');
    const index=Trips.indexOf(tripDelete)
    Trips.splice(index,1);
    res.send(tripDelete);
});
app.get('/api/v1/trips/:trip_id',(req,res)=>{
    const specificTrip=Trips.find(t=>t.trip_id==(req.params.trip_id));
    if (!specificTrip) res.status(404).send('the provided trip_id is not available');
    res.send(specificTrip);
});
app.post('/api/v1/bookaseat',(req, res)=>{
    const bookASeat={
        id : req.body.id,
        trip_id : req.body.trip_id,
        user_id : req.body.user_id,
        created_on : req.body.created_on
    }
    bookings.push(bookASeat);
    res.send(bookASeat);
});
app.get('/api/v1/allbookings',(req, res)=>{
    res.send(bookings);
});
app.delete('/api/v1/deletebooking/:id',(req,res)=>{
    const deleteBooking=bookings.find(b=>b.id==(req.params.id));
    if(!deleteBooking) res.status(404).send('provided id is not available');
    const Index=bookings.indexOf(deleteBooking);
    bookings.splice(Index,1);
    res.send(deleteBooking);
})


app.listen(4000,()=>console.log("Listening on port 4000"));