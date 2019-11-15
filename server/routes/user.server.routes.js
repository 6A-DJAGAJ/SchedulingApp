const Users = require('../controllers/user.server.controller'),
    express = require('express'), 
    router = express.Router();


router.route('/list')
  .get(Users.list);
  //.post(Users.create);

//router.param('User', Users.list);

module.exports = router;