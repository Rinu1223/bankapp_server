const db=require('./db');
let currentUser=""
let accountDetails = {
    1000: { acno: 1000, actype: "savings", username: "userone", password: "userone", balance: 5000 },
    1001: { acno: 1001, actype: "savings", username: "usertwo", password: "usertwo", balance: 5000 },
    1002: { acno: 1002, actype: "current", username: "userthree", password: "userthree", balance: 10000 },
    1003: { acno: 1003, actype: "current", username: "userfour", password: "userfour", balance: 6000 }
}

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
    return db.User.findOne({acno,password})
    .then(user=>
      {
        if(user){
          req.session.currentUser=user
          return{
            statusCode:200,
            status:true,
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
   
   let deposite=(acno,pswd,amount)=>{
     
    let user=accountDetails;
    if(acno in user){
      if(pswd==user[acno]["password"]){
     let depoAmount= user[acno]["balance"]+=parseInt(amount);
     //this.saveDetails();
     
        return {
            statusCode:200,
            status:false,
            amount:depoAmount,
            message:`${parseInt(amount)} amount  is credited to your account ,your aval balance is ${depoAmount} `
        }
            
        
      }
      else{
       
        return {
            statusCode:422,
            status:false,
            message:"incorrect password"
        }
      }
    }
    else{
      
      return {
        statusCode:422,
        status:false,
        message:"invalid account number"
      }
    }
  }
 let withdraw=(acno,paswd,amount)=>{
    let users=accountDetails;
    if(acno in users){
      if(paswd==users[acno]["password"]){
        if(amount< users[acno]["balance"]){
          let withAmount= users[acno]["balance"] -=parseInt(amount);
         // this.saveDetails();
          return {
            statusCode:200,
            status:true,
            amount:withAmount,
            message:`${parseInt(amount)} amount  is debited from your account ,your aval balance is ${withAmount} `
          };
        }
        else{
          
          return{
            
          }
        }
      }
      else{
       
        return {
            statusCode:422,
            status:false,
            message:"incorrect password" 
        }
      }
    }
    else{
      
      return{
        statusCode:422,
        status:false,
        message:"invalid account"  
      }
    }
  }
   module.exports={
       register,
       login,
       deposite,
       withdraw
   }