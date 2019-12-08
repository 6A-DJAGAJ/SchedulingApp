const noAvail = require('../controllers/noAvail.server.controller'),
    express = require('express'), 
    router = express.Router();



  router.route('/create')
    .post(noAvail.create)
  
  router.route('/update')
    .post(noAvail.updateAvail)
  
  router.route('/delete')
    .delete(noAvail.deleteAvail)
  
  //axios does not allow data to be sent during a get method
  // changed to post
  router.route('/:listBy/')
    .post(noAvail.listBy);
  
  /* router.route('/listByWeek/:employeeID')
    .get(avail.listByWeek);
  
  router.route('/listByWeek/:employeeID')
    .get(avail.listByWeek); */
  
  router.param('listBy',noAvail.listBy)
  module.exports = router;