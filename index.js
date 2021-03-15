require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/home.html");
});

app.post("/",function(req,res){

  var name = req.body.nameofperson;
  var mailid = req.body.mailofperson;
  var comment = req.body.textofperson;

  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:process.env.PASSWORD,
      pass:process.env.EMAIL
    }
  });

  let mailoptions = {
    from : mailid,
    to:"puphutmdu@gmail.com",
    subject: name,
    text:comment
  };

  transporter.sendMail(mailoptions,function(err,data){
    if(err){
      console.log(err);
    }
    else{
      console.log("mailed bruh");
    }
  });

  res.redirect("/");
});


app.listen(PORT,function(){
  console.log("running at port");
});
