const Users = require('../controllers/user.server.controller'),
    express = require('express'), 
    router = express.Router();


router.route('/list')
  .get(Users.list);

router.get('/login/:email', function (req, res, next) {
  Users.validate(req.params.email, res);
  next();
});

//router.param('User', Users.list);

module.exports = router;