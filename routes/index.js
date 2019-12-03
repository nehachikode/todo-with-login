const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/index');

router
  .get('/', controller.list)
  .get('/get-description/:id', controller.getDescription)
  .post('/add', controller.add)
  .update('/edit/:id', controller.update)
  .delete('/delete/:id', controller.delete)


module.exports = router;
