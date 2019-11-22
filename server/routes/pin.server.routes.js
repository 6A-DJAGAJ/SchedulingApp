const Users = require('../controllers/pin.server.controller'),
    express = require('express'), 
    router = express.Router();


router.route('/list')
  .get(Users.list);
  //.post(Users.create);

router.route('/findPin/:pinNum')
  .get(Users.read);

router.param('pinNum', Users.findPin)

//router.param('User', Users.list);

module.exports = router;