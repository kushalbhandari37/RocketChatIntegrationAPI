const axios = require('axios');
const responseHelper = require('../../Helpers/responseHelper');

module.exports = {
    //Create new Channel
    createChannel: async (req,res) =>{
        try {
            const data =req.body;
            const config = {
                method: "POST",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.create`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    "name": data.name
                }
            }

            await axios(config)  
            return responseHelper('success','Channel created Successfully',200,'',res); 
            
        } catch (error) {
            console.log(error.response.data.error);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error; 
            return responseHelper('error',message,error.response.status,'',res); 
        }
    },

    //List all Channels
    listChannels: async (req,res) =>{
        try {            
            const config = {
                method: "get",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.list`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,                    
                    'Content-Type': 'application/json'
                }
            }

            const result = await axios(config) 
            return responseHelper('success','Data Fetched Successfully',200,result.data,res); 
            
        } catch (error) {
            console.log(error.response.data); 
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error; 
            return responseHelper('error',message,error.response.status,'',res);   
        }
    },

    //Open Channel
    openChannel: async (req,res) =>{
        try {    
            const roomId = req.params.roomId;             
            const config = {
                method: "post",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.open`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,                    
                    'Content-Type': 'application/json'
                },
                data: {
                    "roomId": `${roomId}` 
                }
            }

            await axios(config)
            return responseHelper('success','',200,'',res); 
            
        } catch (error) {
            console.log(error.response.data);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error;
            return responseHelper('error',message,error.response.status,'',res);   
        }
    },

    //Add leader to the Channel
    addLeader: async (req,res) =>{
        try {    
            const roomId = req.params.roomId;             
            const config = {
                method: "post",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.addLeader`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,                    
                    'Content-Type': 'application/json'
                },
                data: {
                    "roomId": `${roomId}`,
                    "userId": `${req.body.userId}` 
                }
            }

            await axios(config)
            return responseHelper('success','Leader Added Successfuly',200,'',res); 
            
        } catch (error) {
            console.log(error.response.data);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error;
            return responseHelper('error',message,error.response.status,'',res);   
        }
    },

    //Set join code for Channel
    setJoinCode: async (req,res) =>{
        try {    
            const roomId = req.params.roomId;             
            const config = {
                method: "post",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.setJoinCode`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,                    
                    'Content-Type': 'application/json'
                },
                data: {
                    "roomId": `${roomId}`,
                    "joinCode": `${req.body.joinCode}` 
                }
            }

            const result = await axios(config)
            return responseHelper('success','Join Code Created Successfuly',200,result.data,res); 
            
        } catch (error) {
            console.log(error.response.data);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error;
            return responseHelper('error',message,error.response.status,'',res);   
        }
    },

    //Delete Channel
    deleteChannel: async (req,res) =>{
        try {    
            const roomName = req.params.roomName; 
            const config = {
                method: "post",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.delete`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,                    
                    'Content-Type': 'application/json'
                },
                data: {
                    "roomName": `${roomName}`                    
                }
            }

            const result = await axios(config)
            return responseHelper('success','Channel deleted Successfuly',200,result.data,res); 
            
        } catch (error) {
            console.log(error.response.data);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error;
            return responseHelper('error',message,error.response.status,'',res);   
        }
    },

    //Set purpose of Channel
    setPurpose: async (req,res) =>{
        try {    
            const roomId = req.params.roomId;
            const config = {
                method: "post",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.setPurpose`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,                    
                    'Content-Type': 'application/json'
                },
                data: {
                    roomId,
                    "purpose": `${req.body.purpose}`
                }
            }

            const result = await axios(config)
            return responseHelper('success','Purpose set successfuly',200,result.data,res); 
            
        } catch (error) {
            console.log(error.response.data);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error;
            return responseHelper('error',message,error.response.status,'',res);   
        }
    },

    //Invite User to the Channel
    inviteUser: async (req,res) =>{
        try {    
            const roomId = req.params.roomId;
            const config = {
                method: "post",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.invite`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,                    
                    'Content-Type': 'application/json'
                },
                data: {
                    roomId,
                    "userId": `${req.body.userId}`
                }
            }

            const result = await axios(config)
            return responseHelper('success','User invited to the Channel',200,result.data,res); 
            
        } catch (error) {
            console.log(error.response.data);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error;
            return responseHelper('error',message,error.response.status,'',res);   
        }
    },

    //Kick User from the Channel
    kickUser: async (req,res) =>{
        try {    
            const roomId = req.params.roomId;
            const config = {
                method: "post",
                url: `${process.env.ROCKETCHAT_API_URL}/channels.kick`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,                    
                    'Content-Type': 'application/json'
                },
                data: {
                    roomId,
                    "userId": `${req.body.userId}`
                }
            }

            const result = await axios(config)
            return responseHelper('success','User kicked from the Channel',200,result.data,res); 
            
        } catch (error) {
            console.log(error.response.data);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error;
            return responseHelper('error',message,error.response.status,'',res);   
        }
    }
};