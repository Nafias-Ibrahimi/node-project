const mysql=require('mysql2/promise')

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'12345',
    port:3306,
    database:'ourdb'
})
module.exports=db
