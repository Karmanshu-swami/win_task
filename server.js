const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const connectDB = require('./database/dbConnection')

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

connectDB();

app.use(orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
