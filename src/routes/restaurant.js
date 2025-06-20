import express from 'express';
import restaurantController from '../controllers/restaurant.js';
import {authenticate, allowRoles} from '../middlewares/auth.js'
import {isRestaurantOwner} from '../middlewares/restaurant.js'


const router = express.Router();

router.post('/', authenticate, allowRoles(['admin']), restaurantController.addRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.get('/my',authenticate, allowRoles(['restaurant']), restaurantController.getMyRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.delete('/:id',authenticate, allowRoles(['admin','restaurant']),isRestaurantOwner, restaurantController.deleteRestaurantById);
router.put('/:id',authenticate, allowRoles(['admin','restaurant']),isRestaurantOwner, restaurantController.updateRestaurantById);

export default router;
