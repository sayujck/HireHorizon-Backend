require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/connection');
const userRoute = require('./routes/userRoute')
const companyRoute = require('./routes/companyRoute')
const jobRoute = require('./routes/jobRoute')
const applicationRoute = require('./routes/applicationRoute')


const jpServer = express()


jpServer.use(cors())
jpServer.use(express.json())
jpServer.use(express.urlencoded({extended:true}));


const PORT = 3000 || process.env.port

jpServer.use("/api/v1/user", userRoute);
jpServer.use("/api/v1/company", companyRoute);
jpServer.use("/api/v1/job", jobRoute);
jpServer.use("/api/v1/application", applicationRoute);


jpServer.listen(PORT,()=>{
    console.log(`Server started at ${PORT} and waiting for client request`);
    
})

jpServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">Server started at and waiting for client</h1>`)
})