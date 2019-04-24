const express=require('express')

const db=require('./helpers/postDb.js')

const router= express.Router()

router.post('/',(req,res)=>{
    const newPost=req.body
    db
    .insert(newPost)
    .then(post =>{
        res.status(200).json(post)
    })
    .catch(err=>{
        res.status(500).json({error:err, message:"The post could not be added."})
    })
})

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
router.get('/:id', (req,res)=>{
db
.getById(req.params.id)
.then(post =>{
    if (post){
        res.status(200).json(post)
}else{
res.status(404).json({message: "The post with the specified ID does not exist."})
}
})
.catch(err=>{
    res.status(500).json({error:err, message:"Those posts could not be retrieved."})
})
})


module.exports=router;