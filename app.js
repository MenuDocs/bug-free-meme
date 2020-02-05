const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/home.html');
});

app.get('/meme', async function (req, res) {
    const resp = await axios.get('https://apis.duncte123.me/meme');

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
