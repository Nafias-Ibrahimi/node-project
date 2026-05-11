const mysql=require('mysql2/promise')

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    port:3306,
    database:'userd'
})
module.exports=db
