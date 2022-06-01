const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cache = [
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
  res.status(200).json(cache);
});

app.get('/api/TodoItems/:number', function(req,res){
  res.status(200).json(cache.find(toDoItem => toDoItem.todoItemId == req.params.number));
});

app.post('/api/TodoItems', function(req,res){
  let foundIndex = cache.findIndex(toDoItem => toDoItem.todoItemId == req.body.todoItemId)
  foundIndex > -1 ? cache.splice(foundIndex, 1, req.body) : cache.push(req.body);
  res.status(201).send(req.body);
});

app.delete('/api/TodoItems/:number', function(req,res){
  res.status(200).send(cache.splice(cache.findIndex(toDoItem => toDoItem.todoItemId == req.params.number), 1).shift());
});

module.exports = app;
