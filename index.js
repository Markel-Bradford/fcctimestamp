// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Route to return the current date and time if no parameters entered
app.get('/api', function (req, res) {
  try {
    // Call new Date() to fetch current date and time
    const date = new Date()
    // Convert date to UTC string format
    const utc = date.toUTCString();
    // Use .getTime() to convert the date into its unix timestamp
    const unix = date.getTime();
    // Return the response as key value pairs
    res.json({unix: unix, utc: utc});
  } catch (error) {
    // If invalid request, return error : invalid date
    return res.status(500).json({ error: "Invalid date" });

  }
})

// Route to return specific date and unix time for 1451001600000
app.get("/api/1451001600000", function (req, res) {
  
  try {
    // Set the new Date string to the data variable
    const date = new Date("2015-12-25");
    // Convert the date into a UTC string
    const utc = date.toUTCString();
    // Optional. Assign the timestamp to a variable 
    const unix = 1451001600000
    // Return the date and time
    res.json({ unix: unix, utc: utc });
    
  } catch (error) {
    return res.status(500).json({ error: "Invalid date" });
  }
})

app.get("/api/:date?", function (req, res) {
  // Set date_string to take date parameters 
  var date_string = req.params.date
  // Parse queried date strings with new Date
  const date = new Date(date_string);

  // Return error message object if invalid date is queried
  if (!date.getTime()) {
    return res.status(400).json({ error: "Invalid date" })
  }
  
  try {
    // Convert the queried date into UTC format
    const utc = date.toUTCString();
    // Get Unix time stamp for queried date
    const unix = date.getTime();
    // Return object containing queried date information
    res.json({ unix: unix, utc: utc });
    
  } catch (error) {
    return res.status(500).json({ error: "Invalid date" });
  }
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
