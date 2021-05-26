const express=require('express')
const app=express();
const dataservice=require('./services/data.service'); // import data.service
app.use(express.json()); //parsing json format to object
app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD")
});
//post-creat
app.post('/',(req,res)=>{
    res.send("THIS IS A POST METHOD")
});
app.post('/register',(req,res)=>{
//console.log(req.body);
const result=dataservice.register(req.body.uname,req.body.acno,req.body.paswd)
  res.status(result.statusCode).json(result);  
});
app.post('/login',(req,res)=>{
    //console.log(req.body);
    const result=dataservice.login(req.body.acno,req.body.paswd)
      res.status(result.statusCode).json(result);  
    });
    app.post('/deposite',(req,res)=>{
        //console.log(req.body);
        
        const result=dataservice.deposite(req.body.acno,req.body.paswd,req.body.amount)
          res.status(result.statusCode).json(result);  
        });
        app.post('/withdraw',(req,res)=>{
            //console.log(req.body);
            
            const result=dataservice.withdraw(req.body.acno,req.body.paswd,req.body.amount)
              res.status(result.statusCode).json(result);  
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
