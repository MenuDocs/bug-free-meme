const express = require('express');
const app = express();

app.use('assets/', express.static('assets'));
app.use('temp/', express.static('temp'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/home.html');
});

app.listen(process.env.PORT || 3000);
