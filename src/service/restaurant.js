import Restaurant from '../models/restaurant.js';


const createRestaurant = (restaurantData) => {
 return Restaurant.create(restaurantData);
};


const getRestaurants = (query) => {
 const { page = 1, limit = 10 } = query;
 const offset = (page - 1) * limit;


 const filter = {};
 const { ownerId } = query;
 if (ownerId) filter.ownerId = ownerId;


 return Restaurant.findAll({
   where: filter,
   limit,
   offset,
   order: [['name', 'ASC']],
 });
};


const getRestaurantById = (id) => {
 return Restaurant.findByPk(id);
};


const deleteRestaurantById = async (id) => {
 const deletedCount = await Restaurant.destroy({
   where: { id }
 });
 return deletedCount;
};


export const updateRestaurantById = async (id, updateData) => {
 const restaurant = await Restaurant.findByPk(id);


 if (!restaurant) {
   return null;
 }


 await restaurant.update(updateData);
 return restaurant;
};


export default {
 createRestaurant,
 getRestaurants,
 getRestaurantById,
 deleteRestaurantById,
 updateRestaurantById,
};
