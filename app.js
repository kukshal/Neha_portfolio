const express = require("express");                     //express use for nodejs code to write in simple way using methods
const path = require("path");                          // provides the utilities for working with file and directory paths
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();                                      //creating app object of express application(initializes a new instance)
const port = 3005;


// Connect to MongoDB
mongoose.connect('mongodb://localhost/ResponsivePortfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});


const Contact = mongoose.model('Contact', contactSchema);

// Express Specific Stuff
app.use('/static', express.static('static')); // Serving static files
app.use(express.urlencoded({ extended: true })); // To support URL-encoded bodies



// Set view engine
app.set('view engine', 'html'); // Change this if you're not using a templating engine
app.set('views', path.join(__dirname, 'views')); // Set the view directory

// Endpoints
app.get('/', (req, res) => {
    const params = {};
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html')); // Serve static HTML directly
    //     res.status(200).render('index.html', params);
});


// Handle form submission
app.post('/contact', (req, res) => {
    let myData = new Contact(req.body);
    myData.save()
        .then(() => {
            res.send("This item has been saved to the database");
        })
        .catch(() => {
            res.status(400).send("Item was not saved to the database");
        });
});



// Start the server
app.listen(port, () => {
    console.log(`This app is started successfully on port ${port}`);
});



























