const express=require('express')
const app=express();

app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD")
});
//post-creat
app.post('/',(req,res)=>{
    res.send("THIS IS A POST METHOD")
});
//put- update/modify whole
app.put('/',(req,res)=>{
    res.send("THIS IS A put METHOD")
});
//patch -update/modify partially
app.patch('/',(req,res)=>{
    res.send("THIS IS A patch METHOD")
});
//delete
app.delete('/',(req,res)=>{
    res.send("THIS IS A delete METHOD")
});
app.listen(3000,()=>{
    console.log("server started at port :3000");
})
