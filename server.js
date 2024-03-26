const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

//open server
const server = app.listen(port, ()=>{console.log("listening...")});

app.use(express.static('website'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

//open json db
const db = fs.readFileSync('db.json');
var recipeDB = JSON.parse(db);

app.get('/recipe/:name/', (req, res) => {
    var name = req.params.name.replace(/_/g," ");

    var reply ={
        status: 404,
        "msg": "recipe not found"
    };
    for(var i=0; i < recipeDB.length; i++){
        if(recipeDB[i].name === name){
            reply = {
                status: 200,
                msg: "all okey",
                recipe: recipeDB[i]
            }
        }
    }

    res.send(reply);
    
})

app.get('/recipe', (req, res) => {
    res.send(recipeDB);
})

app.post('/add_recipe',(req, res) =>{
    
    recipeDB.push(req.body)
    var data = JSON.stringify(recipeDB)
    fs.writeFile('db.json', data, ()=>{console.log("all set")})

    res.send("Thankyu")
})



