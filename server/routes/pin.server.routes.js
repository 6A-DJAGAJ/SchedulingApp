const uPins = require('../controllers/pin.server.controller'),
    express = require('express'), 
    router = express.Router();

/*
  When trying to call use the following schema:

    (base url)  +  (routing)
  ex.
  localhost:3000/clockIn/3737
*/

router.route('/create')
  .post(uPins.create)

//Dangerous to leave way to get pins like this
//router.route('/list').get(uPins.list)

//takes a req.body of an _id to delete
router.route('/delete/')
  .delete(uPins.delete)

//did not need read functions

router.route('/clockIn/:pinNumIn')
  .get(uPins.clockIn);
router.route('/clockOut/:pinNumOut')
  .get(uPins.clockOut);

router.route('/update')
  .put(uPins.update);


//paramaters are sent to the exported functions
router.param('pinNumIn', uPins.clockIn)
router.param('pinNumOut', uPins.clockOut)


module.exports = router;