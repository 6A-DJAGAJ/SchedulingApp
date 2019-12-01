const Users = require('../controllers/user.server.controller'),
    express = require('express'), 
    router = express.Router();


router.route('/delete')
  .delete(Users.delete);

router.route('/create')
  .post(Users.create);

router.route('/list')
  .get(Users.list)

//router.param('User', Users.list);

module.exports = router;