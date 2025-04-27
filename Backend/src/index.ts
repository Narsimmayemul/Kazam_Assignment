import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongo from './config/mongoClient';
import taskRoutes from './routes/taskRoutes';
import './services/mqttService'; 


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', taskRoutes);
// app.use('/', taskRoutes);

const PORT = process.env.PORT || 5000;

connectMongo();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
