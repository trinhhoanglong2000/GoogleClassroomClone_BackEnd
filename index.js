import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import classesRoutes from './routes/classes.js'
const app = express()



app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/classes',classesRoutes);
app.get('/',(req,res)=>{
    res.send('Hello')
})
const CONNECTION_URL= `mongodb+srv://longdien0098:longdien0098@cluster0.2uaet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT =process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(PORT, ()=>console.log(`Server running`))
})
.catch((error)=>
    console.log(error.message)
)

