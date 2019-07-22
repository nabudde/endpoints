const express=require("express");
const bodyParser = require('body-parser')
const app=express();

app.use(express.json());
bodyParser.json(app)

let signup=[];
let signin=[];
let createTrip=[];
let cancelTrip=[
    {
        "id" : "1",
        "seating_capacity" : "60",
        "bus_license_number" : "UBB23",
        "origin" : "Kampala", 
        "destination" : "Kigali",
        "trip_date" : "01/01/2020",
        "fare" : "100000"
    }
];

app.post('/api/v',(req, res)=>{
    if(!req.body.Email){
        res.status(400).send("email is required");
        return;
    }
    if(!req.body.Password){
        res.status(400).send("pasword is required");
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
/*
app.post('/api/v/v1',(req, res)=>{
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
*/

app.post('api/v/v1',(req,res)=>{
    const create_trip={
        id :req.body.id,
        seating_capacity : req.body.seating_capacity,
        bus_license_number : req.body.bus_license_number,
        origin : req.body.origin, 
        destination : req.body.destination,
        trip_date : req.body.trips_date,
        fare : req.body.fare
    };
    createTrip.push(create_trip);
    res.send(create_trip);
    console.log(create_trip);   
});
app.get('api/v/v1/v2/v3',(req,res)=>{
    res.send(cancelTrip);
    console.log(createTrip);  
})


app.listen(4000,()=>console.log("Listening on port 4000"));