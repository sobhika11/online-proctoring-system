const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');


env.config();
app.use(express.json());

const userRoutes = require('./routes/user.routes');
const testRoutes = require('./routes/test.routes');

app.use('/public', express.static(path.join(__dirname, "uploads")));
app.use('/api', userRoutes)
app.use('/api', testRoutes)

// mongodb connection
const connectDB = (dburl) => {
    return mongoose.connect(dburl)
        .then(() => console.log('Database Connected'))
        .catch((err) => console.error('DB connection failed:', err));
};

const start = async () => {
    try {
        await connectDB(process.env.dburl);
        app.listen(process.env.PORT, () => {
            console.log(`Server started is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();