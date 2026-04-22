const { contact } = require('../controllers/contact.controller');


const contactRoutes = require('express').Router();

contactRoutes.post('/api', contact)
module.exports = contactRoutes;