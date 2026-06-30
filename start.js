const app = require('./app');
require('dotenv').config();
require('./models/Registration'); // ensure the model is registered before connecting to the database
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB'); 
}).on('error', (err) => {
    console.error('Error connecting to MongoDB:', err); 
});

const server = app.listen(3000, () => {
    console.log(`Server is running on port ${server.address().port}`);
});
