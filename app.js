require('dotenv').config()
const express = require("express");
const app = express();
const apiRoutes = require('./routes')
app.use(express.urlencoded({ extended: true }))
const PORT =(process.env.PORT) ? process.env.PORT : 5000;

app.use(express.json())


//Start Server
app.listen(PORT,()=>{
    console.log('Server has started');
})

//route
app.use('/api/v1/',apiRoutes())
