require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoute');

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "OPTIONS"],
    credentials: true,
}));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
}).on('error', (e) => {
    console.log('Error starting server:', e.message);
});

app.use('/api/weather', weatherRoutes);