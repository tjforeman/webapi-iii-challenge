const express=require('express');
const usersRouter = require('./data/users-router.js');
const postsRouter = require('./data/posts-router.js');


const server=express()




server.use(express.json());



server.get('/',(req,res,next)=>{
    res.send(`Hello world`);
})

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);


module.exports=server;