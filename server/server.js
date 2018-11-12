// express for server-side methods
const express = require('express');
const bodyParser = require('body-parser');

// creates the application
const app = express();
// sets the port for the application
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

let whirlydoos = [];

app.get('/api/whirlydoos', (req, res) => {
  res.send(whirlydoos);
});

app.post('/api/whirlydoos', (req, res) => {
	whirlydoos.push({ 
		'id': whirlydoos.length,
		'created_at': new Date(),
		'name': req.body.name,
		'skill': req.body.skill
	});

  res.send(whirlydoos);
});

app.put('/api/whirlydoos/update/:id', (req, res) => {
  let whirlydoo = whirlydoos.find(w => w.id == req.params.id);
  whirlydoo.name = req.body.name;
  whirlydoo.skill = req.body.skill;

	const index = whirlydoos.findIndex(w => w.id === req.params.id);
	whirlydoos[index] = whirlydoo;

  res.send(whirlydoos);
});

app.delete('/api/whirlydoos/delete/:id', (req, res) => {
  whirlydoos = whirlydoos.filter(w => w.id != req.params.id);
  
	res.send(whirlydoos);
});

// listen for requests made to get /api/hello and post /api/world
app.listen(port, () => console.log(`Listening on port ${port}`));
