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
//app.use(bodyParser.json());


//routes
app.get('/', function(req,res){

  res.json({'status': 'ok'});
  res.status(200);

});

app.get('/api/TodoItems', function(req,res){
  
  res.json(array);
  res.status(200);

})
app.get('/api/TodoItems/:number', function(req,res){
  
  console.log(req.params.number);
  res.json(array[req.params.number]);
  res.status(200);

})


module.exports = app;
