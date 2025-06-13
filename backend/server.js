require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoute');

const app = express();

const allowedOrigins = process.env.ENVIRONMENT === 'dev' 
  ? ['http://localhost:3000'] 
  : ['https://weather-app-lsf.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "OPTIONS"],
    credentials: true,
}));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
}).on('error', (e) => {
    console.log('Error starting server:', e.message);
});

app.get('/', (req, res) => {
    res.status(200).json("Welcome to the Weather API")
})
app.use('/api/weather', weatherRoutes);