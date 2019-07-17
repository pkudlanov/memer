const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/api/v1/memes/:id', function(req, res, next) {
	res.json({ msg: 'This is CORS-enabled for all origins!' });
});
  
app.listen(80, function() {
	// eslint-disable-next-line no-console
	console.log('CORS-enabled web server listening on port 80');
});


app.use(express.json());

app.use('/api/v1/memes', require('./routes/memer-routes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
