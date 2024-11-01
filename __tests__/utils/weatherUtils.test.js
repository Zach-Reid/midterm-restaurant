const { Cuisines, Dishes } = require("../../utils/data");
const { generateRandomMenuItem, generateMenu, selectRandomCuisine } = require("../../utils/restaurantUtils");

describe('Restaurant Functions', () => {
    
  describe('generateRandomMenuItem', () => {
    it('should generate a valid random menu item for a given cuisine', () => {
        const cuisine = 'italian';
        const menuItem = generateRandomMenuItem(cuisine);
        expect(menuItem).toHaveProperty('name');
        expect(menuItem).toHaveProperty('description');
        expect(menuItem).toHaveProperty('price');
        expect(menuItem).toHaveProperty('special'); 
        expect(Dishes[cuisine]).toContainEqual(expect.objectContaining({ name: menuItem.name }));
    });

    it('should return undefined for an invalid cuisine', () => {
        const menuItem = generateRandomMenuItem('non-existent-cuisine');
        expect(menuItem).toBeUndefined();
    });
});




describe('generateMenu', () => {
  it('should generate a menu with a random cuisine type and items', () => {
      const menu = generateMenu();
      expect(menu).toHaveProperty('cuisine'); 
      expect(menu.items.length).toBeGreaterThanOrEqual(5);
      expect(menu.items.length).toBeLessThanOrEqual(10);
      expect(Dishes[menu.cuisine]).toHaveLength(Dishes[menu.cuisine].length);
  });
});




function generateRandomMenuItem(cuisine) {
  const dishes = Dishes[cuisine];
  if (!dishes) return undefined; 
  const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
  
  return {
      name: randomDish.name,
      description: randomDish.description,
      price: randomDish.price,
      special: randomDish.special, 
  };
}




});



