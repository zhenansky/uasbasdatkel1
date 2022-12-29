import express from "express";
import {
    getItems,
    getItemById, 
    saveItem, 
    updateItem, 
    deleteItem,
    getItemByIdBazaar
} from "../controllers/ItemController.js"
const router = express.Router();

router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.get('/items/milik/:id', getItemByIdBazaar);
router.post('/items', saveItem);
router.patch('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

export default router;

