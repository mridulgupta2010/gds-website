require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
const session = require("express-session");
// const mongoStore = require("connect-mongo");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
const fs = require('fs');
const axios = require('axios');

//Create an express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');

const storesData = require('./public/stores/stores.json');

app.get("/", function(req,res){
    res.render("index");
})

var stdOperators = ["/315lags","/450lags","/630lags","/315liags","/450liags","/630liags", "/940piags"];
stdOperators.forEach((stdOperator)=> {
    app.get(stdOperator, function(req,res){
        res.render("products/sliding/standard"+stdOperator);
    })
})

var lowVoltOperators = ["/230lv-liag","/450lv-liag","/500lv-liag"];
lowVoltOperators.forEach((lowVoltOperator)=> {
    app.get(lowVoltOperator, function(req,res){
        res.render("products/sliding/low-voltage"+lowVoltOperator);
    })
})

var beltOperators = ["/450liags/belt","/630liags/belt","/230lvl/belt","/450lvl/belt"];
beltOperators.forEach((beltOperator)=> {
    app.get(beltOperator, function(req,res){
        res.render("products/sliding/standard"+beltOperator);
    })
})


app.get("/product", function(req,res){
    res.render("products/sliding/low-voltage/230lv-liag");
})


async function geocodeAddress(address) {
    const apiKey = GKEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } else {
            throw new Error('Geocoding failed');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

// Haversine Distance Function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

function findNearestStores(storesData, lat, lon, type) {
    return storesData.features
        .filter(store => store.properties.category === type)
        .map(store => ({
            ...store.properties,
            distance: calculateDistance(lat, lon, store.geometry.coordinates[1], store.geometry.coordinates[0])
        }))
        .sort((a, b) => a.distance - b.distance);
}

// Route to handle the search
app.post('/search-stores', async (req, res) => {
    try {
        console.log(req.body);  // Log the request body to debug
        const { location, type, range } = req.body;
        const { lat, lng } = await geocodeAddress(location); // Geocode the location string
        console.log(lat);
        console.log(lng);
        const filteredStores = findNearestStores(storesData, lat, lng, type);
        res.json({ status: "success", data: filteredStores });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Server error');
    }
});

//Setting PORT for hosting express server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started on port");
})