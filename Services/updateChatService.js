const axios = require('axios');
const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = {
    updateChatDetails: async (req,res) => {
        const visitorsIds = await getVisitors();
        for(let id of visitorsIds){
            const visitorDetails = await getVisitorDetails(id);
            const rooms = await getRooms(visitorDetails.token);              
            await getAllMessages(visitorDetails,rooms);      
        }
    }
}

const getRooms = async (token) => {
    const config = {
        method: 'GET',
        url: `${process.env.ROCKETCHAT_API_URL}/livechat/visitor/${token}/room`,
        headers: {
            'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
            'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,
            'Content-Type': 'application/json'
        },
    }
    const data = await axios(config);
    const rooms = data.data.rooms;
    return rooms;
}

const getVisitors = async () => {
    await saveVisitors();   
    return JSON.parse(fs.readFileSync('./tmp/users.txt','utf8'));    
}

const getVisitorDetails = async (id) => {
    const config = {
        method: 'GET',
        url: `${process.env.ROCKETCHAT_API_URL}/livechat/visitors.info?visitorId=${id}`,
        headers: {
            'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
            'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,
            'Content-Type': 'application/json'
        },
    }
    const visitors = await axios(config);    
    return visitors.data.visitor;
}

//Saves All the visitors id to a txt file
const saveVisitors = async () => {
    const config = {
        method: 'GET',
        url: 'http://34.74.3.136:8080/api/livechat/visitors',
        headers: {            
            'Content-Type': 'application/json'
        }
    }
    const visitors = await axios(config);
    const visitorsId = [];
    visitors.data.map(visitors=>{
        visitorsId.push(visitors.id);
        
    })    
    fs.writeFileSync('./tmp/users.txt',JSON.stringify(visitorsId), (err)=>{
        if (err) throw err;
        console.log('User Updated on file successfully');
    }) 

}

//Get all Messages of the visitor
const getAllMessages = async (visitorDetails,rooms) => {
    for(let room of rooms){        
        const config = {
            method: 'GET',
            url: `${process.env.ROCKETCHAT_API_URL}/channels.history?roomId=${room._id}`,
            headers: {
                'X-Auth-Token': `${process.env.ROCKETCHAT_ACCESS_TOKEN}`,
                'X-User-id': `${process.env.ROCKETCHAT_USER_ID}`,
                'Content-Type': 'application/json'
            },
        }
        const data = await axios(config);  
        console.log(data.data)  
        await updateMessage(visitorDetails,data.data);    
    }
}

//Send the details to another API
const updateMessage = async (visitorDetails,messages) => {
    let data = {};
    data.moduleName = "Contacts";
    data.salutationtype = "";
    data.firstname = visitorDetails.name ? visitorDetails.name.split(" ")[0] : "";
    data.contact_no = (visitorDetails.phone.length > 0) ? visitorDetails.phone[0].phoneNumber : "";
    data.phone = (visitorDetails.phone.length > 0) ? visitorDetails.phone[0].phoneNumber : "";
    data.lastname = visitorDetails.name ? visitorDetails.name.split(" ")[1] : "";
    data.phone = (visitorDetails.phone.length > 0) ? visitorDetails.phone[0].phoneNumber : "";
    data.account_id = visitorDetails._id;
    data.homephone = "";
    data.leadsource = "";
    data.otherphone = "";
    data.title = "";
    data.fax = "";
    data.department = (visitorDetails.department) ? visitorDetails.department : "";
    data.birthday = "";
    data.email = (visitorDetails.visitorEmails.length > 0) ? visitorDetails.visitorEmails[0].address : "";
    data.contact_id = "";
    data.assistant = "";
    data.secondaryemail = "";
    data.assistantphone = "";
    data.donotcall = "";
    data.emailoptout = "";
    data.assigned_user_id = "";
    data.reference = "";
    data.notify_owner = "";
    data.createdtime = "";
    data.modifiedtime = "";
    data.modifiedby = "";
    data.portal = "";
    data.support_start_date = "";
    data.support_end_date = "";
    data.mailingstreet = "";
    data.otherstreet = "";
    data.mailingcity = "";
    data.othercity = "";
    data.mailingstate = "";
    data.otherstate = "";
    data.mailingzip = "";
    data.otherzip = "";
    data.mailingcountry = "";
    data.othercountry = "";
    data.mailingpobox = "";
    data.otherpobox = "";
    data.imagename = "";
    data.description = "";

    const config = {
        method: 'POST',
        url: `http://crm.bluealgo.com/api/create-entity.php`,
        headers: {            
            'Content-Type': 'application/json'
        },
    }
}