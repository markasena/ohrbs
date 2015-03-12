'use strict';

var express = require('express');
var controller = require('./guest.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/',controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.put('/:id/addreservation', auth.isAuthenticated(), controller.addReservation);
router.post('/createandregister', controller.createandregister);
module.exports = router;
