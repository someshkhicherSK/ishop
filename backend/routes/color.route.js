const { getColor, createColor, updateColor, deleteColor, editColor } = require('../controllers/color.controller');
const authMiddleware = require('../middleware/authmiddleware');
const colorRoutes = require('express').Router();

colorRoutes.get('/get/:id?', getColor);
colorRoutes.post('/create', authMiddleware, createColor)
colorRoutes.patch('/update/:id', updateColor)
colorRoutes.delete('/delete/:id', deleteColor)
colorRoutes.put('/edit/:id', editColor)
module.exports = colorRoutes;