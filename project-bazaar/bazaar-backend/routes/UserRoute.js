import express from "express";

import {
    getUsers,
    getUserById, 
    saveUser, 
    updateUser, 
    deleteUser
} from "../controllers/UserController2.js"
const router = express.Router();

router.get('/users', getUsers);
router.get('/items/:id', getUserById);
router.post('/items', saveUser);
router.patch('/items/:id', updateUser);
router.delete('/items/:id', deleteUser);

export default router;

