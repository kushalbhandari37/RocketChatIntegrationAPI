const axios = require('axios');
const responseHelper = require('../../Helpers/responseHelper');

module.exports = {
    //Create Deparment
    createDepartment: async (req,res) => {
            try {
                const data =req.body;                
                const config = {
                method: "POST",
                url: `${process.env.ROCKETCHAT_API_URL}/livechat/department`,
                headers: {
                    'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                    'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,
                    'Content-Type': 'application/json'
                },
                data
            }

            await axios(config)  
            return responseHelper('success','Deparment created Successfully',200,'',res); 
            
        } catch (error) {
            console.log(error.response.data.error);  
            const message = (error.response.data.message) ? error.response.data.message : error.response.data.error; 
            return responseHelper('error',message,error.response.status,'',res); 
        }
    }

}