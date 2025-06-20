import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js';
import restaurantRoutes from './routes/restaurant.js';

const app = express()

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/restaurants', restaurantRoutes);

export default app
