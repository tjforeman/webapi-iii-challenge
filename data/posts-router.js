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
    res.status(500).json({error:err, message:"That post could not be retrieved."})
})
})

router.put('/:id',(req,res) =>{
    const updatedPost=req.body
    if (!updatedPost.text || !updatedPost.user_id){
        res.status(400).json({message:"Please provide text and user id for the post."})
    }else{
    db
    .update(req.params.id,updatedPost)
    .then(post=>{
    if(!post){
        res.status(404).json({message:"The post with the specified ID does not exist."})
    }else{
        res.status(201).json(post)
    }
    })
    .catch(err=>{
        res.status(500).json({ error: "The post information could not be modified."})
    })
    }
     })

router.delete('/:id', (req,res)=>{
    db
    .remove(req.params.id)
    .then(post =>{
        if (post){
            res.status(200).json(post)
    }else{
    res.status(404).json({message: "The post with the specified ID does not exist."})
    }
    })
    .catch(err=>{
        res.status(500).json({error:err, message:"That post could not be removed."})
    })
    })


module.exports=router;