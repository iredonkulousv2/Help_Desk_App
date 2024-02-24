import express from 'express'
const router = express.Router();

router.route('/')
    .get((req,res) => {
       return res.send('admin dashboard')
    })
   

module.exports = router;
