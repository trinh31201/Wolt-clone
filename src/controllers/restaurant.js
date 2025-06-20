import restaurantService from '../service/restaurant.js';


const addRestaurant = async (req, res, next) => {
 try {
   const restaurantData = req.body;
   const newRestaurant = await restaurantService.createRestaurant(restaurantData);
   res.status(200).json({
     status: 'success',
     message: 'Restaurant created successfully.',
     data: {
       newRestaurant,
     },
   });
 } catch (err) {
   console.error(err);
   res.status(500).json({ status: 'error', message: 'Error creating restaurant.' });
 }
};


const getAllRestaurants = async (req, res, next) => {
 try {
   const restaurants = await restaurantService.getRestaurants(req.query);
   res.status(200).json({
     status: 'success',
     data: {
       restaurants,
     },
   });
 } catch (err) {
   console.error(err);
   res.status(500).json({ status: 'error', message: 'Error fetching restaurants.' });
 }
};


const getRestaurantById = async (req, res, next) => {
 try {
   const restaurantId = req.params.id;


   const restaurant = await restaurantService.getRestaurantById(restaurantId);


   if (!restaurant) {
     return res.status(404).json({
       status: 'error',
       message: 'User not found.',
     });
   }


   res.status(200).json({
     status: 'success',
     data: {
       restaurant,
     },
   });
 } catch (err) {
   console.error(err);
   res.status(500).json({ status: 'error', message: 'Error fetching restaurant.' });
 }
};


const getMyRestaurants = async (req, res, next) => {
 try {
   const ownerId = req.user.id;
   const query = { ...req.query, ownerId };
   const restaurants = await restaurantService.getRestaurants(query);
   res.status(200).json({
     status: 'success',
     data: {
       restaurants,
     },
   });
 } catch (err) {
   console.error(err);
   res.status(500).json({ status: 'error', message: 'Error fetching restaurants.' });
 }
};


const deleteRestaurantById = async (req, res, next) => {
 try {
   const restaurantId = req.params.id;
   const deletedCount = await restaurantService.deleteRestaurantById(restaurantId);


   if (deletedCount === 0) {
     return res.status(404).json({
       status: 'error',
       message: 'Restaurant not found.',
     });
   }


   res.status(200).json({
     status: 'success',
     message: 'Restaurant deleted successfully.',
   });
 } catch (err) {
   console.error(err);
   res.status(500).json({ status: 'error', message: 'Error deleting restaurant.' });
 }
};


const updateRestaurantById = async (req, res, next) => {
 try {
   const restaurantId = req.params.id;
   const updateData = req.body;


   const updatedRestaurant = await restaurantService.updateRestaurantById(restaurantId, updateData);


   if (!updatedRestaurant) {
     return res.status(404).json({
       status: 'error',
       message: 'Restaurant not found.',
     });
   }


   res.status(200).json({
     status: 'success',
     message: 'Restaurant updated successfully.',
     data: { updatedRestaurant }
   });
 } catch (err) {
   console.error(err);
   res.status(500).json({ status: 'error', message: 'Error updating restaurant.' });
 }
};


export default {
 addRestaurant,
 getAllRestaurants,
 getMyRestaurants,
 getRestaurantById,
 deleteRestaurantById,
 updateRestaurantById,
};
