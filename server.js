// Create the front-end (visuals) for home page, reservation form, and reservation views.

//     Create a basic server using Express.JS

// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// port to make heroku work
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//     Create a set of routes for getting and posting table data

var reservations = [
  {
    routeName: "nathan",
    name: "Nathan",
    number: "123-456-7890",
    email: "nathan.pecchia@gmail.com",
    id: 090,
  },
];

// post new reservation route
// Create New reservations - takes in JSON input
app.post("/api/reservations", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name
    .replace(/\s+/g, "")
    .toLowerCase();

  console.log(newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});

// get old reservation route

app.get("/api/reservations", function (req, res) {
  if (reservations.length > 0) {
    return res.json(reservations);
  }

  return res.json(false);
});

//     Create a set of routes for displaying the HTML pages

// index route sendfile

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// view tables route sendfile
app.get("/viewtables", function (req, res) {
  res.sendFile(path.join(__dirname, "viewtables.html"));
});

// reservation route sendfile
app.get("/reservations", function (req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

//     Use jQuery to run AJAX calls to GET and POST data from users to the Express server
