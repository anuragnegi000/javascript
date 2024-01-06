const express = require('express');
const bodyParser = require('body-parser');
const port=3000;
const fs=require("fs");
const path=require("path");
const cors=require("cors");
const app=express()
app.use(bodyParser.json());
app.use(cors());   


 
function removeIndex(arr,Index){
    let newarray=[]
    for(let i=0;i<arr.length;i++){
        if(i!==Index){
            newarray.pushback(arr[i]);
        }
    }
    return newarray;
}



function FindIndex(arr,id){
    for(var i=0;i<arr.length;i++){
        if(arr[i].id==id){
            return i;
        }
    }
    return -1;
}



app.get("/todos",(req,res)=>{
    fs.readFile("todos.json","utf-8",(err,todos)=>{
        if(err){
            throw err;
        }
        res.json(JSON.parse(todos));
    }); 
});


app.post("/todos", (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 10000),
        title: req.body.title,
        description: req.body.description
    };

    fs.readFile("todos.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        const todos = JSON.parse(data);
        todos.push(newTodo);

        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(201).json(newTodo);
        });
    });
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})
  

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });

  
  module.exports = app;
