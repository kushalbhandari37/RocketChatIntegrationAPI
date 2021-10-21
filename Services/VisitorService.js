const axios = require('axios');

const fetchUser = async ()=>{
    const config = {
        method: "GET",
        url: `${process.env.ROCKETCHAT_API_URL}/users.list`,
        headers: {
            'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
            'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,
            'Content-Type': 'application/json'
        }
    }
    const users = await axios(config);
    console.log(users.data);
    console.log("User fetched");
}
module.exports = {
    getUserMessages: async () => {
        await fetchUser();
    }
}