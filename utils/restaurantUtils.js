const { Dishes, Cuisines } = require("./data");

/**
 * Generates a random menu item based on a given cuisine.
 * @param {string} cuisine - The desired cuisine for the menu item.
 * @returns {*} A random menu item with a name, description, price, and special status.
 */
function generateRandomMenuItem(cuisine) {
  const dishes = Dishes[cuisine];
  const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
  
  return {
    name: randomDish.name,
    description: randomDish.description,
    price: (Math.random() * (20 - 5) + 5).toFixed(2), // A random price between $5 and $20
    special: Math.random() < 0.5 // There's a 50% chance of it being a daily special
  };
}

/**
 * Selects a random cuisine type for a restaurant.
 * @returns {string} A random cuisine type.
 */
function selectRandomCuisine() {
    return Cuisines[Math.floor(Math.random() * Cuisines.length)];
}

/**
 * Generates a menu for a restaurant, including a random cuisine type and a list of menu items.
 * @returns {Object} An object representing the restaurant's menu, including the cuisine type and items.
 */
function generateMenu() {
    const cuisine = selectRandomCuisine();
    const numberOfItems = Math.floor(Math.random() * 6) + 5; // Between 5 and 10 items
    const menuItems = [];

    for (let i = 0; i < numberOfItems; i++) {
        menuItems.push(generateRandomMenuItem(cuisine));
    }

    return {
        cuisine,
        items: menuItems
    };
}

module.exports = { generateRandomMenuItem, selectRandomCuisine, generateMenu };


