const express=require('express'); //import express
const app=express();

const dataservice=require('./services/data.service'); // import data.service

const session=require('express-session');//import session
app.use(session({
  secret:'randomsecurestring',
  resave:false,
  saveUninitialzed:false
}));

////middleware
app.use((req,res,next)=>{
  console.log("middleware");
  next();
})

//middleware
const logMiddleWare=(req,res,next)=>{
  console.log(req.body);
  next();
}
app.use(logMiddleWare);

//authentication middleware
const authMiddleware=(req,res,next)=>{
  if(!req.session.currentUser){
    return res.json({
      statusCode:401,
      status:false,
      message:"please login"
    })
  }
  else{
    next();
  }
}

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
dataservice.register(req.body.uname,req.body.acno,req.body.paswd)
.then(result=>{
  res.status(result.statusCode).json(result); 
})
   
});
app.post('/login',(req,res)=>{
    //console.log(req.body);
    dataservice.login(req,req.body.acno,req.body.paswd)
    .then(result=>{
      res.status(result.statusCode).json(result); 
    })
       
    });
    
app.post('/deposite',authMiddleware,(req,res)=>{
        //console.log(req.body);
      
        dataservice.deposite(req.body.acno,req.body.paswd,req.body.amount)
        .then(result=>{
          res.status(result.statusCode).json(result);
        })
           
        });
        
app.post('/withdraw',authMiddleware,(req,res)=>{
            //console.log(req.body);
            
            dataservice.withdraw(req.body.acno,req.body.paswd,req.body.amount)
            .then(result=>{
              res.status(result.statusCode).json(result); 
            })
               
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
