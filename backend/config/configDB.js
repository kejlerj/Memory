// Connection to MongoDB database

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true); // To remove deprecated advertissment
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to database');
});
