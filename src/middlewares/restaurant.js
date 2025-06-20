import Restaurant from '../models/restaurant.js';


export const isRestaurantOwner = async (req, res, next) => {
 try {
  
   if (req.user.role === 'admin') return next();


   const restaurantId = req.params.id;
   const userId = req.user.id;


   const restaurant = await Restaurant.findByPk(restaurantId);


   if (!restaurant) {
     return res.status(404).json({ message: 'Restaurant not found.' });
   }


   if (restaurant.ownerId !== userId) {
     return res.status(403).json({ message: 'You do not own this restaurant.' });
   }


   req.restaurant = restaurant;
   next();
 } catch (err) {
   console.error(err);
   res.status(500).json({ message: 'Internal server error.' });
 }
};
