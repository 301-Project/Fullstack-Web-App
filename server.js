`use strict`;

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const unirest = require('unirest');

// Load environment variables from .env file
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;


//Application Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

//Set the view engine for server side templating
app.set('view engine', 'ejs');

//Allowing for methods:put/delete
app.use(methodOverride(function (request, response) {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
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
app.get('/', queryIngredient);
// app.post();
// app.get();
// app.post();
// app.put();
// app.get();
// app.delete();


function queryIngredient(request, response) {
  let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?maxCalories=5000&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=0&minCarbs=0&minFat=0&minProtein=0&number=3&offset=0&query=eggs`

  return unirest.get(url)
    .header('X-Mashape-Key', 'process.env.PRODUCT_API_KEY')
    .header('Accept', 'application/json')
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    })
    .catch(error => handleError(error, response));
  // .then(apiResponse => apiResponse.body.items.map(book => new Book(book.volumeInfo)))
  // .then(books => response.render('pages/searches/show', { arrayOfBooks: books }))
}




// Catch-all error handler
app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Helper Functions
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong')
}

function Ingredient(response) {
  this.ingredient_id = response.id || 'No id available';
  this.ingredient_title = response.title || 'No title available';
  this.ingredient_image = response.image || 'No image available';
  this.search_query = response.submitted;
}

function Recipe(response) {
  this.recipe_id = response.id;
  this.recipe_title = response.title;
  this.recipe_image = response.image;
  this.used_ingredient_count = response.usedIngredientCount;
  this.missed_ingredient_count = response.missedIngredientCount;
}

function RecipeSteps(response) {
  this.recipe_steps_id = response.body.id;
  this.recipe_steps_image = response.body.image;
  this.recipe_steps_url = response.body.spoonacularSourceUrl;
}

// Rendering user-selected ingredients from inventory.html dropdown
function ingredientSearch(request, response) {
  response.render('pages/searches/inventory'); // TODO: where user selections are rendered
}

// Creates three recipe choices from the API url query
function createRecipe(request, response) {
  let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&ranking=1`// TODO: requires template literals in search

  return unirest.get(url)
    .header('X-Mashape-Key', 'process.env.PRODUCT_API_KEY')
    .header('X-Mashape-Host', 'spoonacular-recipe-food-nutrition-v1.p.mashape.com')
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    });

}


// DESTRUCTURING (when we are adding database)
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
