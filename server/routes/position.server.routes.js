const Positions = require('../controllers/position.server.controller'),
    express = require('express'), 
    router = express.Router();


router.route('/delete')
  .delete(Positions.delete);

router.route('/create')
  .post(Positions.create);

router.route('/list')
  .get(Positions.list)

//router.param('Position', Positions.list);

module.exports = router;