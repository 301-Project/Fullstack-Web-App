`use strict`;

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
require('dotenv').config();

//Application Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
//Set the view engine for server side templating
app.set('view engine', 'ejs');

//Allowing for methods:put/delete

app.use(bodyParser.urlencoded());
app.use(methodOverride(function (request,response) {
  if(request.body && typeof request.body === 'object' && '_method' in request.body) { 
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

//Client set up for server
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.log(err));





//API routes - rendering the search form

app.get();
app.post();
app.get();
app.post();
app.put();
app.get();
app.delete();



// Catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

//HELPER FUNCTIONS
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong')
}






// DESTRUCTURING (when we are adding database)