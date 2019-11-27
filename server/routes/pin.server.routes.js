const uPins = require('../controllers/pin.server.controller'),
    express = require('express'), 
    router = express.Router();


router.route('/list')
  .get(uPins.list)
  .delete(uPins.delete);

router.route('/clockIn/:pinNumIn')
  .get(uPins.read);
router.route('/clockOut/:pinNumOut')
  .get(uPins.read);

router.param('pinNumIn', uPins.clockIn)
router.param('pinNumOut', uPins.clockOut)

//router.param('User', Users.list);

module.exports = router;