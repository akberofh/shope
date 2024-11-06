import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoute.js';
import pubgRoutes from './routes/pubgRoute.js';
import productRoutes from './routes/productRoute.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const allowedOrigins = [
  'https://akberofh-rentacar.vercel.app',
];

const app = express();
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
    credentials: true,
  }));app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

connectDB();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/pubg', pubgRoutes );
app.use('/api/product', productRoutes);

app.get("/", (req, res) => {
  res.json({
      message: "Welcome",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
