const express = require('express');
const app = express()
app.get('/',(req,res)=>{
    res.send({
        code:1,
        msg:'sessage',
        data:[{name:'clj'}]
    })

})
app.listen(3001,()=>{
    console.log("this app is listen 3001")
})