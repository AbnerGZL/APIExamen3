import express from 'express';
import {
    getProducts,
    getProductById,
    getCarActive,   
    postProducts,
    postCar,
    putProducts,
    deleteProducts,
    deleteCar,
    patchCar,
    login,
    register
} from "../controllers/home.controller.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/car/:id', getCarActive);

router.post('/products', postProducts);
router.post('/login', login);
router.post('/register', register);
router.post('/car/:id', postCar);

router.put('/products/:id', putProducts);
router.patch('/car/:id', patchCar);

router.delete('/products/:id', deleteProducts);
router.delete('/car/:id', deleteCar);

export default router;