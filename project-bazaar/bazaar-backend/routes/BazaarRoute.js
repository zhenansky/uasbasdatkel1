import  express  from "express";
import {
    getBazaars,
    getBazaarById,
    saveBazaar,
    updateBazaar,
    deleteBazaar
} from "../controllers/BazaarController.js"
const router = express.Router();

router.get('/bazaars', getBazaars); 

router.get('/bazaars/:id', getBazaarById); 
router.post('/bazaars', saveBazaar);
router.patch('/bazaars/:id', updateBazaar);
router.delete('/bazaars/:id', deleteBazaar);

export default router;