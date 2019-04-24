const express=require('express')

const db=require('./helpers/userDb.js')

const router= express.Router()

router.get('/', (req,res)=>{
    db
    .get()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json({error:err, message:"The users information could not be retrieved."})
    })
})


module.exports=router;