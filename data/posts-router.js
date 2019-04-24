const express=require('express')

const db=require('./helpers/postDb.js')

const router= express.Router()

router.get('/', (req,res)=>{
    db
    .get()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err=>{
        res.status(500).json({error:err, message:"The post information could not be retrieved."})
    })
})


module.exports=router;