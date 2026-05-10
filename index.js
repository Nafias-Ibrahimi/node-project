const express=require('express');
const app=express();
// const port=process.env.PORT || 3000
const port=5000
app.get('./index' ,(req ,res)=>{
    res.status(200).send('status code of 200');
    console.log(res.status(200));
})



app.listen('port' ,() =>{
    console.log(`Server running at the port ${port}`);

})