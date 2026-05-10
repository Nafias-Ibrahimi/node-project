const express=require('express')
const router=express.Router()
const db=require('../../config/dbConnection')

router.get('/' ,async(req,res) =>{
  const q='SELECT * FROM user';
  const[rows]=await db.query(q)

res.status(200).json({success:true ,message:'All users from database', data:rows})

})
module.exports=router