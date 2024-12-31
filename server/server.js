import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import visitorRoutes from './visitorRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());    

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.log(error);
})


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.use('/visitor', visitorRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
}) 