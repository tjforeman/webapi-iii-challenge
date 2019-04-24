const express=require('express')

const db=require('./helpers/userDb.js')

const router= express.Router()


function bodyToCaps(req,res,next) {
        req.body.name=req.body.name.toUpperCase();
        next();
  };

router.post('/', bodyToCaps,(req,res)=>{
    const newUser=req.body
    db
    .insert(newUser)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json({error:err, message:"The user could not be added."})
    })
})

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

router.get('/:id', (req,res)=>{
    db
    .getById(req.params.id)
    .then(user =>{
        if (user){
            res.status(200).json(user)
    }else{
    res.status(404).json({message: "The user with the specified ID does not exist."})
    }
    })
    .catch(err=>{
        res.status(500).json({error:err, message:"that user could not be retrieved."})
    })
    })

    router.get('/posts/:id', (req,res)=>{
        db
        .getById(req.params.id)
        .then(user =>{
            if (user>0){
                res.status(200).json(user)
        }else{
        res.status(404).json({message: "The user with the specified ID either does not exist or has no posts at this time."})
        }
        })
        .catch(err=>{
            res.status(500).json({error:err, message:"Those posts could not be retrieved."})
        })
        })

    router.put('/:id', bodyToCaps,(req,res) =>{
        const updatedPost=req.body
        if (!updatedPost.name){
            res.status(400).json({message:"Please provide a name for the user."})
        }else{
        db
        .update(req.params.id,updatedPost)
        .then(post=>{
        if(!post){
            res.status(404).json({message:"The user with the specified ID does not exist."})
        }else{
            res.status(201).json(post)
        }
        })
        .catch(err=>{
            res.status(500).json({ error: "The user information could not be modified."})
        })
        }
         })

    router.delete('/:id', (req,res)=>{
        db
        .remove(req.params.id)
        .then(user =>{
            if (user){
                res.status(200).json(user)
        }else{
        res.status(404).json({message: "The user with the specified ID does not exist."})
        }
        })
        .catch(err=>{
            res.status(500).json({error:err, message:"That user could not be removed."})
        })
        })


module.exports=router;