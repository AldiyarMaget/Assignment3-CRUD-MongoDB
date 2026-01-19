require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const blogRoutes = require('./routes/blog.routes');


app.use(express.json());
app.use('/blogs', blogRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })

})


