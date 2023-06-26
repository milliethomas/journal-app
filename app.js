const express = require('express');
const app = express();
const port = 3500;

app.use(express.static(__dirname + '/public'));

app.get('/:page', (req, res) => {
	const page = req.params.page;
	res.sendFile(__dirname + `/views/${page}.html`);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});