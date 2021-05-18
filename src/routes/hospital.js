const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const {isAuthenticated}= require('../helpers/auth');

router.get('/hospitallist',isAuthenticated, hospitalController.listc);
router.post('/addhospital',isAuthenticated,hospitalController.savec);
router.get('/deletehospital/:IdHospital',isAuthenticated,hospitalController.deletec);
router.get('/updatehospital/:IdHospital',isAuthenticated,hospitalController.editc);
router.post('/updatehospital/:IdHospital',isAuthenticated,hospitalController.updatec);

module.exports = router;