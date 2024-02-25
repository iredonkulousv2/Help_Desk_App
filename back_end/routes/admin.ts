import express from 'express'
const router = express.Router();
import checkAdmin from '../controllers/adminController'

router.route('/')
    .post(checkAdmin)
   

module.exports = router;

