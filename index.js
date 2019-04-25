// code away!
const envReader =require('dotenv')
envReader.config();

const server=require('./server.js')

const port =process.env.PORT ||8000;
server.listen(port, () =>{
    console.log('server running on 8k')
})