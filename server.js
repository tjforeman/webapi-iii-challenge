const express=require('express');

const server=express()


server.use(express.json());


server.get('/',(req,res,next)=>{
    res.send(`Hello world`);
})


module.exports=server;