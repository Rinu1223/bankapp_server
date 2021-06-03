const db=require('./db');
let currentUser=""
// let accountDetails = {
//     1000: { acno: 1000,  username: "userone", password: "userone", balance: 5000 },
//     1001: { acno: 1001,  username: "usertwo", password: "usertwo", balance: 5000 },
//     1002: { acno: 1002,  username: "userthree", password: "userthree", balance: 10000 },
//     1003: { acno: 1003,  username: "userfour", password: "userfour", balance: 6000 }
// }

const register=(uname,acno,paswd)=>{
    return db.User.findOne({acno})
    .then(user=>{
      if(user){
        return {
          statusCode:422,
          status:false,
         message:"user exit... please login"
      }
      }
      else{
        const newUser=new db.User({
          acno,
          username:uname,
          password:paswd,
          balance:0
        })
        newUser.save()
        return{
          statusCode:200,
            status:true,
            message:"Successfully Registered"
        }
      }
    })
  }
   const login=(req,accnum,paswd)=>{
     let password=paswd
     let acno=parseInt(accnum);
     console.log(acno);
     console.log(password);
    return db.User.findOne({acno,password})
    .then(user=>
      {
        if(user){
          req.session.currentUser=user
          return{
            statusCode:200,
            status:true,
            name:user.username,
            message:"Successfully login"
        } 
        }
        else{
      
          return {
            statusCode:422,
            status:false,
           message:"invalid accont number"
          }
        }
      })
    }
   
   let deposite=(acno,password,amt)=>{
     let amount=parseInt(amt);
    return db.User.findOne({acno,password})
    .then(user=>
      {
        if(!user){
          return {
            statusCode:422,
            status:false,
            message:"Invalid credentials"
        }
        }
        else{
          user.balance+=amount;
          user.save();
          return {
            statusCode:200,
            status:false,
            amount:user.balance,
            message:`${parseInt(amount)} amount  is credited to your account ,your aval balance is ${user.balance} `
        }
        }
      })
    }
    
    
 let withdraw=(acno,password,amnt)=>{
let amount=parseInt(amnt);
return db.User.findOne({acno,password})
.then(user=>{
  if(user){
    if(amount>user.balance){
    return {
      statusCode:422,
      status:false,
      message:"Insuffient balance" 
  }
  }
  else{
    user.balance-=amount;
    user.save();
    return {
      statusCode:200,
      status:true,
      amount:user.balance,
      message:`${amount} amount  is debited from your account ,your aval balance is ${user.balance} `
    }
  }
}
else{
  return {
    statusCode:422,
    status:false,
    message:"Invalid credentials" 
}
}
})
 }
    
   module.exports={
       register,
       login,
       deposite,
       withdraw
   }