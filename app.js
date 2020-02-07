const express = require('express');
const https = require('https');
const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/home.html');
});

app.get('/meme', async function (req, res) {
	const resp = await new Promise((resolve, reject) => {
		const options = {
			headers: {
				'User-Agent': req.headers['user-agent'], // Copy browser thing
			},
		};
		
		https.get('https://apis.duncte123.me/meme', options, (resp) => {
		  let data = '';

		  // A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
			data += chunk;
		  });

		  // The whole response has been received. Print out the result.
		  resp.on('end', () => {
			resolve(JSON.parse(data));
		  });

		}).on('error', reject);
		
	});

    res.send(resp.data);
});

app.get('/oink', (req, res) => {
    const routes = app._router.stack
            .map(x => x.route)
            .filter(Boolean)
            .map(r => r.path);
    res.send(routes);
});

const port = process.env.PORT || 3000;

console.log(`http://localhost:${port}/`)
app.listen(port);
