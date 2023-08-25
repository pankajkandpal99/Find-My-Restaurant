const express = require('express');
const app = express();
const mongoose = require('mongoose');
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbConfig.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once("open", () => {
     console.log("Successfully connected to mongoDB.")
})

db.on("error", (err) => {
   console.log("Error connecting to MongoDb. "+ err);
   process.exit();
})

require('./routes/hotel.route')(app);
require('./routes/hotel.route')(app);
require('./routes/hotel.route')(app);
require('./routes/hotel.route')(app);
require('./routes/hotel.route')(app);
require('./routes/hotel.route')(app);
require('./routes/hotel.route')(app);
require('./routes/hotel.route')(app);
require('./routes/hotel.route')(app);

app.listen(serverConfig.PORT , ()=>{
    console.log(`Server is Up and listening on port ${serverConfig.PORT}`);
})




