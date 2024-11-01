const { Restaurants, Cuisines } = require("./utils/data");
const express = require('express');
const path = require('path');
const { generateRandomMenuItem, generateMenu, selectRandomCuisine } = require("./utils/restaurantUtils");

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

/**
 * GET /
 * Renders the homepage that lists cities and restaurant names.
 */
app.get('/', (request, response) => {
    const randomCuisine = selectRandomCuisine();
    const randomMenuItem = generateRandomMenuItem(randomCuisine);
    
    response.render('index', { restaurants: Restaurants, randomMenuItem });
});

/**
 * GET /restaurant/:name
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected and a menu is generated based on it.
 */
app.get('/restaurant', (request, response) => {
  const restaurantId = request.query.restaurantId;
  const selectedRestaurant = Restaurants.find(restaurant => restaurant.id === restaurantId);

  if (selectedRestaurant) {
      // Select a random cuisine for the restaurant
      const randomCuisine = selectRandomCuisine();
      // Then generate a menu for the selected restaurant
      const menu = generateMenu(randomCuisine); 

      // Render the existing restaurant.ejs view
      response.render('restaurant', { restaurant: selectedRestaurant, menu });
  } else {
      response.status(404).send('Restaurant not found');
  }
});


app.get('/menu-alerts', (request, response) => {
  const restaurantId = request.query.restaurantId;
  const selectedRestaurant = Restaurants.find(restaurant => restaurant.id === restaurantId);

  if (selectedRestaurant) {

      const alerts = {
          'the-gourmet-bistro': 'Today’s special: 20% off on all pasta dishes!',
          'spicy-kitchen': 'New dish added: Spicy Tofu Stir-fry!',
          //Nothing for Healthy Eats to show the blank message
          'comfort-diner': 'Desserts are 50% off this weekend! (Meal purchase required.)',
          'sweet-tooth-bakery': 'Try our new Pumpkin Spice Muffins, available during Fall!',
      };

      const alertMessage = alerts[selectedRestaurant.id] || 'No current alerts for this restaurant.';

      response.render('menu-alerts', { restaurant: selectedRestaurant, alert: alertMessage });
  } else {
      response.status(404).send('Restaurant not found');
  }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


