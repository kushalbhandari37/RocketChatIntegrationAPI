const channelController = require('../../Controller/Channel/channelController');
const departmentController = require('../../Controller/Department/departmentController');


module.exports = (router) => {
    //Channels Route
    router.post('/channel/create',channelController.createChannel);
    router.get('/channel/list',channelController.listChannels);
    router.post('/channel/open/:roomId',channelController.openChannel);
    router.post('/channel/add-leader/:roomId',channelController.addLeader);
    router.post('/channel/set-join-code/:roomId',channelController.setJoinCode);
    router.delete('/channel/delete/:roomName',channelController.deleteChannel);
    router.post('/channel/set-purpose/:roomId',channelController.setPurpose);
    router.post('/channel/invite/:roomId',channelController.inviteUser);
    router.post('/channel/kick/:roomId',channelController.kickUser);

    //Department Route
    router.post('/department/create',departmentController.createDepartment);
}
