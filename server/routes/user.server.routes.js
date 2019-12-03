const Users = require('../controllers/user.server.controller'),
    express = require('express'), 
    router = express.Router();



router.route('/list')
  .get(Users.list);

// Checks info and logs user in
router.post('/login', function (req, res) {
  Users.validate(req, res);
});

// Gets the current session information (user, admin)
router.get('/checkUser', function(req, res) {
  console.log('Returning user: ', req.session.user);
  // console.log('Is admin?: ', req.session.admin);
  res.send({
    user: req.session.user,
    admin: req.session.admin
  });
});

router.route('/delete')
  .delete(Users.delete);

router.route('/create')
  .post(Users.create);


router.route('/list')
  .get(Users.list);

router.route('/update')
  .put(Users.update);
//router.param('User', Users.list);

module.exports = router;