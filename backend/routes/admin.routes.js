const adminRoutes = require('express').Router();
const { adminLogin } = require('../controllers/admin.controller');

adminRoutes.post('/login',adminLogin);

module.exports = adminRoutes;
