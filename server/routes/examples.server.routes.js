const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/hello')
  .get(examples.hello);

router.route('/')
  .get(Users.list)
  .post(Users.create);






module.exports = router;