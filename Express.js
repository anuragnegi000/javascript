 const express = require('express');
 const app = express();

 app.use(function(req,res,next){
    next();
 });

 app.get('/',function ( req,res){
    res.send('Hello world');
 });

 app.get('/profile',function ( req,res){
    res.send('Hello there from profile');
 });

 app.get('/profile/:username',function ( req,res){
    res.send(`Hello from ${req.params.username}`);  //we use `  `to print our output dynamically
 });

 app.listen(3000);
