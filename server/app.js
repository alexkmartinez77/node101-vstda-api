const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var array = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

//server
const app = express();

app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.get('/', function(req,res){
  res.status(200).json({'status': 'ok'});
});

app.get('/api/TodoItems', function(req,res){
  res.status(200).json(array);
});

app.get('/api/TodoItems/:number', function(req,res){
  let itemMatch;
  array.forEach(toDoItem => {
    if(toDoItem.todoItemId == req.params.number){
      itemMatch = toDoItem;
    }
  });
  res.status(200).json(itemMatch);
});

app.post('/api/TodoItems', function(req,res){
  let postToDo = req.body;
  array.forEach((toDo, index)=> {
    if(postToDo.todoItemId == toDo.todoItemId){
      array.splice(index, 1, postToDo);
    } else {
      array.push(postToDo);
    }
  })
  res.status(201).send(postToDo);
});

app.delete('/api/TodoItems/:number', function(req,res){
  let deleteToDoId = req.params.number;
  let deleted = `Todo ID# ${deleteToDoId} does not exist.`
  array.forEach((toDo, index) => {
    if(deleteToDoId == toDo.todoItemId){
      deleted = array.splice(index, 1);
    }
  })
  res.status(200).send(deleted[0]);
});

module.exports = app;
