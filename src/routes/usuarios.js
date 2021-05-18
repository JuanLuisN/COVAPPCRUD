const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const {isAuthenticated}= require('../helpers/auth');

router.get('/usuarioslist',isAuthenticated, usuariosController.list);
router.post('/addusuario',isAuthenticated,usuariosController.save);
router.get('/deleteusuario/:idusuario',isAuthenticated,usuariosController.delete);
router.get('/updateusuario/:idusuario',isAuthenticated,usuariosController.edit);
router.post('/updateusuario/:idusuario',isAuthenticated,usuariosController.update);

module.exports = router;
