const express = require("express");
const mongoose = require('mongoose');
const cors =  require('cors');


const app =   express();

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/finalDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.4.2',{useNewUrlParser:true});

const userSchema =  {
  username:String,
  email:String,
  password:String
};
const User  = new mongoose.model("User",userSchema);


app.post("/signup",function(req,res){
    const newUser = new User({
      username : req.body.username,
      email:req.body.email,
      password : req.body.password
    });
  
    newUser.save(function(err,result){
      if (err){
        console.log(err);
        res.send({err:err});
      }
      if(result){
        res.send(result);
      }
      else{
        res.send({message:"Successfully Registered1"});
    
      }
    });
  });

  app.post("/login",function(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    User.find({username:username,email:email,password:password}, function(err, result){
      if(err){
        res.send({err: err});
      }
      
      if (result.length >0){
          res.send(result);
          }else {
              res.send({message:"Wrong username/password"});
          }    
      
    });
  })

  app.get("/loggedusers",(req,res)=>{
    User.find({})
         .then(foundUser => res.json(foundUser))
         
  });

app.listen(3001,() => {
    console.log("Running on port 3001");
});