const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    obj = {
        name: "Harsh",
        age: 22
    }
    res.json(obj);
})

module.exports = router