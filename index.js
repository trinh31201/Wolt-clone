import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.send('This is your home page')
})
const port = 3001

app.listen(port, ()=>{
    console.log('My api is rrunning on Port ${port}')
})
