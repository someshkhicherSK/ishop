const userRoutes = require('express').Router();
const { login,register,address,getuser,deleteAddress,updatePassword } = require('../controllers/user.controller');

userRoutes.post('/create',register);
userRoutes.get('/get/:id?',getuser);
userRoutes.post('/login',login);
userRoutes.post('/address/:userId',address);
userRoutes.delete('/add_delete/:index/:id',deleteAddress)
userRoutes.patch('/password/:id',updatePassword)

module.exports = userRoutes;
