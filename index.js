const express=require('express');
const urlRoute=require('./routes/url')
const app=express();
const PORT=8001;
const {connectToMongoDB}=require('./connection');

app.use(express.json());

connectToMongoDB('mongodb://localhost:27017/url-shortener')
.then(()=>console.log('Connected to MongoDB'))

app.use('/',urlRoute)
app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))