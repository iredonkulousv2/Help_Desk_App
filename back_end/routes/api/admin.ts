import express from 'express'
const router = express.Router();
const adminController = require('../../controllers/adminController')

router.route('/')
    .post(adminController.checkAdmin)
   

module.exports = router;

