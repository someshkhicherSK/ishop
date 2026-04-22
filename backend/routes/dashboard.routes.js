const dashboardRoutes = require('express').Router();
const { getData } = require('../controllers/dashboard.controller');


dashboardRoutes.get('/get',getData);

module.exports = dashboardRoutes;
