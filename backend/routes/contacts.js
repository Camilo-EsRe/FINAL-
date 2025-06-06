const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/authMiddleware');

// @route    GET api/contacts
// @desc     Obtener todos los contactos del usuario
// @access   Private
router.get('/', auth, contactController.getContacts);

// @route    POST api/contacts
// @desc     Crear un nuevo contacto
// @access   Private
router.post('/', auth, contactController.createContact);

// @route    PUT api/contacts/:id
// @desc     Actualizar un contacto
// @access   Private
router.put('/:id', auth, contactController.updateContact);

// @route    DELETE api/contacts/:id
// @desc     Eliminar un contacto
// @access   Private
router.delete('/:id', auth, contactController.deleteContact);

module.exports = router;