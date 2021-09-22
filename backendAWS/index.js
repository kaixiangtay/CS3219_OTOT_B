// Import express
const express = require('express');

// Import cors
const cors = require('cors');

// Set up mongoose
const mongoose = require("mongoose");

// Initialize the app
let app = express();

// Import routes
let apiRoutes = require('./routes/foodRoutes');

// Configure bodyparser to handle post requests
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(cors());

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);

//Enable cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});


mongoose.connect('mongodb+srv://cs3219otot:cs3219rocks@cluster0.cb6ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true});

// Connect to Mongoose and set connection variable
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, err => {
    if (err) {
		console.log(err);
		process.exit(1);
	}

    console.log(`Running FoodTracker backend on port ${port}`);
});

module.exports = app;