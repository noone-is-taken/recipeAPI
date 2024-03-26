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
var recipe_db = JSON.parse(db);

//search function
function searchRecipes(value, field) {
    if (!data || !data.recipes) {
      console.error('Data or recipes array not found');
      return [];
    }
    
    if (field === 'name'){
      return  data.recipes.filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()));
    }else if(field === 'author'){
      return  data.recipes.filter(recipe => recipe.author.toLowerCase().includes(query.toLowerCase()));
    }
    return [];
  }


app.get('/recipe/:name/', (req, res) => {
    var name = req.params.name.replace(/_/g," ");

    var reply ={
        status: 404,
        "msg": "recipe not found"
    };
    recipe = searchRecipes(name, 'name')
    if (recipe.length !== 0){
        reply = {
            status: 200,
            msg: "all okey",
            recipe: recipe[0]
        }
    }
    res.send(reply);
    
})

app.get('/recipe/:author/', (req, res) => {
    var author = req.params.author.replace(/_/g," ");

    var reply ={
        status: 404,
        "msg": "recipe not found"
    };
    recipe = searchRecipes(author, 'author')
    if (recipe.length !== 0){
        reply = {
            status: 200,
            msg: "all okey",
            recipe: recipe[0]
        }    
    }
    res.send(reply);
})

app.get('/recipe', (req, res) => {
    res.send(recipe_db);
})

app.post('/add_recipe',(req, res) =>{
    
    recipe_db.push(req.body)
    var data = JSON.stringify(recipe_db)
    fs.writeFile('db.json', data, ()=>{console.log("recipe added")})

    res.send("Thankyu")
})



