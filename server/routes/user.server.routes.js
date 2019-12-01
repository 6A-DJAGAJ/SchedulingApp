const Users = require('../controllers/user.server.controller'),
    express = require('express'), 
    router = express.Router();



router.route('/list')
  .get(Users.list);

// Checks info and logs user in
router.post('/login', function (req, res, next) {
  Users.validate(req, res);
  next();
});

router.route('/delete')
  .delete(Users.delete);

router.route('/create')
  .post(Users.create);


router.route('/list')
  .get(Users.list);

//router.param('User', Users.list);

module.exports = router;