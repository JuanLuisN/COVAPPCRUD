const express = require('express');
const passport = require('passport');
const router = express.Router();
const {isAuthenticated}= require('../helpers/auth');

const casosController = require('../controllers/casosController');

router.get('/casos',isAuthenticated, casosController.listc);
router.post('/add',isAuthenticated, casosController.savec);
router.get('/delete/:IdCasos',isAuthenticated,casosController.deletec);
router.get('/update/:IdCasos',isAuthenticated,casosController.editc);
router.post('/update/:IdCasos',isAuthenticated,casosController.updatec);

module.exports = router;