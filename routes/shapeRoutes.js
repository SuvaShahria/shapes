const express = require('express');

const routes = express.Router();
const shapeController = require('../controller/ShapeController');

routes.post('/create',shapeController.Create);
routes.post('/init',shapeController.Init);
routes.get('/getAll',shapeController.getAll);
routes.get('/view/:id',shapeController.ViewId);
routes.get('/user',shapeController.User);

routes.delete('/delete/:id',shapeController.Delete);
routes.put('/update/:id',shapeController.Update);

routes.all('*',invalid);
//sends a 404 back to the user if any other URI is used.
async function invalid(req,res)
{
    res.status(404).json({
        message:'Resources not Found'
    })
}

module.exports = routes;