const express  = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine' , 'ejs' );
app.set('views' , path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

/*
 writing own middleware

app.use(function(req,res,next){
  console.log('middleware 1 called');
  next();
});

//middleware 2

app.use(function(req,res,next){
  console.log("middleware 2 called");
  next();
});

*/

// const contactList =[
//   {
//     name:"Sumit raj",
//     phone:"6202637635"
//   },

//   {
//     name:"Arushi",
//     phone:"9876543210"
//   },

//   {
//     name:"Riya",
//     phone:"9876532411"
//   }

// ];

app.get('/',function(req,res){

  Contact.find({},function(err,contacts){
    if(err){
      console.log("error in fetching data from db");
      return;
    }

    return res.render('home',{
      title : "My Contact",
      contact_list : contacts
    });  

  });

});

app.get('/practice',function(req,res){
  return res.render('practice',{
    title:"let us play"
  });
});

app.post('/create-contact',function(req,res){
  // return res.redirect('/practice');
  /* contactList.push({
    name:req.body.name,
    phone:req.body.phone
  }); */

  // contactList.push(req.body);

  Contact.create({
    name:req.body.name,
    phone:req.body.phone
  },function(err,newContact){
    if(err){
      console.log('err in creating contact');
      return;
    }
    console.log('******',newContact);
    return res.redirect('back');

  });
  
});

app.get("/delete-contact/",function(req,res){
  
  let id = req.query.id;

  Contact.findByIdAndDelete(id,function(err){
    if(err){
      console.log('err in deleting from db');
      return;
    }

    return res.redirect('back');

  });

});

app.listen(port,function(err){
  if(err){ console.log("serveris not running ");};
  console.log('server is running fine');
});