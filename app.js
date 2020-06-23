const express = require('express');
const bodyParser = require('body-parser');
const todoController = require('./controllers/todoController');
const projectController = require('./controllers/projectController');

const app = express();
app.engine('.html', require('ejs').__express);
app.set('view engine','html');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));
todoController(app) //工作经历
projectController(app) //项目展示

app.listen(3000,()=>{
    console.log('run at http://localhost:3000');
})