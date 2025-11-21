import express from 'express';
//import mongoose from 'mongoose'
import mongoose from 'mongoose';
//import dotenv-->configure what is in the env file
import dotenv from 'dotenv';

//import blog router
import blogRoutes from './Routes/blogRoutes.js';

//import auth router
import authRoutes from './Routes/authRoutes.js';

//import user router
import userRoutes from './Routes/userRoutes.js';

//import cors
import cors from 'cors';



//read from env
dotenv.config();

//setup express app
const app = express();
//setup cors 
//allow access from frontend 
app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(express.json({limit:'10mb'}))

//make uploads folder accesible publicly(access from frontend)
app.use('/uploads', express.static('uploads'));

//we will be fetching json data(key value pairs) so we need to use express json middleware
app.use(express.json());

//test route
app.get('/test', (req, res) => {
    res.send('<h1>Test Route Loaded</h1>');
});

//base url for blog routes
app.use('/api/blogs', blogRoutes);

//base url for auth routes
app.use('/api/auth', authRoutes);

//base url for user routes
app.use('/api/users', userRoutes);

//all routes not specified
app.use((req, res) => {
    res.status(404).send('<h1>404 Route Not Found</h1>');
});

//connect to mongoDB
const db=process.env.MONGO_URI;

async function dbconection(){
    try {
        await mongoose.connect(db);
        console.log('MongoDB connected successfully');

        //start server
        app.listen(5000, () => {
    console.log('server is running on port http://localhost:5000');
})
        
    } catch (error) {
        console.log(error,'MongoDB connection failed');
        
    }
}
dbconection();