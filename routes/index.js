const Router = require('express').Router;
const rocketChatRoute = require('./rocketChat/rocketChatRoute');

module.exports = () =>{
    const router = Router();
    rocketChatRoute(router);
    return router;
}