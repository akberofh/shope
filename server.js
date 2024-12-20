import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoute.js';
import pubgRoutes from './routes/pubgRoute.js';
import productRoutes from './routes/productRoute.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';  // Import Mongoose

dotenv.config();

// Database connection (Ensure you connect to your DB before the app starts)
connectDB();

const allowedOrigins = [
  'https://akberofh-car-rental.vercel.app',
];

const app = express();
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define the Review schema and model before using it in the routes
const reviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
  name: String,
  email: String,
  catagory: String, // Corrected spelling: "catagory"
});

const Review = mongoose.model('Review', reviewSchema); // Create the Review model

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/pubg', pubgRoutes);
app.use('/api/product', productRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

// API route for posting reviews
app.post('/api/reviews', async (req, res) => {
  console.log('Request Body:', req.body);

  const { rating, review, name, email, catagory } = req.body;

  try {
    const newReview = new Review({ rating, review, name, email, catagory });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API route for getting reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API route for deleting a review by ID
app.delete('/api/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: `Review with ID ${id} deleted successfully.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
