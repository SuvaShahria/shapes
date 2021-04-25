const express = require('express');

const routes = express.Router();
const userController = require('../controller/UserController');

routes.get('/login',userController.Login);

routes.post('/signup',userController.Signup);

routes.get('/logout',userController.Logout);

routes.get('/view',userController.View);

routes.all('*',invalid);
//sends a 404 back to the user if any other URI is used.
async function invalid(req,res)
{
    res.status(404).json({
        message:'Resource not Found'
    })
}

module.exports = routes;