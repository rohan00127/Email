const express = require('express');
require('dotenv').config()
const server = express();
var bodyParser = require('body-parser');  
var nodemailer = require('nodemailer');
 
const port = process.env.PORT;
var urlencodedParser = bodyParser.urlencoded({ extended: false })  


server.use(express.static('public'))
server.set("view engine" , "ejs");

server.get("/" , (req,res)=>{
    res.render("index")
})


server.post("/sendemail" ,urlencodedParser, (req,res)=>{
 
     const emailrece = req.body.email;
     const subject = req.body.subject;
     const message = req.body.message;


   
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rohanmakvana90@gmail.com',
              pass: 'sjdd awhx rddw sqvw'
            }
          });
          
          var mailOptions = {
            from: 'rohanmakvana90@gmail.com',
            to: emailrece,
            subject: subject,
            text: message
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
               res.render("index")
            }
          });

   


     
})
server.listen(port , ()=>{
    console.log("Server is started")
})