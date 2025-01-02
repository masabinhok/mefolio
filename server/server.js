import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import visitorRoutes from './visitorRoutes.js';
import fetch from 'node-fetch';

const PORT = process.env.PORT || 5000;
const backendUrl = process.env.BACKEND_URL;
const app = express();

app.use(express.json());    

setInterval(() => {
  fetch(`${backendUrl}/ping`)
    .then(() => console.log('Pinged the server to keep it awake'))
    .catch((err) => console.error('Error pinging the server:', err));
}, 5 * 60 * 1000);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.log(error);
})


app.use(cors({
    origin: '*',
    credentials: true
}));


app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.get('/ping', (req, res)=>{
    res.send('pong');
})

app.use('/visitor', visitorRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
}) 