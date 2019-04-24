const express=require('express')

const db=require('./helpers/userDb.js')

const router= express.Router()

router.post('/',(req,res)=>{
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