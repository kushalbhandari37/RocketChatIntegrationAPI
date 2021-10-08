require('dotenv').config()
const express = require("express");
const app = express();
const apiRoutes = require('./routes')
app.use(express.urlencoded({ extended: true }))
const PORT =(process.env.PORT) ? process.env.PORT : 5000;
const chatService = require('./Services/updateChatService');

app.use(express.json())
const schedule = require('node-schedule');

//Start Server
app.listen(PORT,()=>{
    console.log('Server has started');
})

const job = schedule.scheduleJob(`*/${process.env.SCHEDULE_INTERVAL} * * * *`, async ()=>{
    await chatService.updateChatDetails();
  });

//route
app.use('/api/v1/',apiRoutes())
