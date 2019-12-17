'use strict';

const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const PORT    = process.env.PORT || 3000;

app.use(express.static('public'));

http.listen(PORT, function() {
  console.log(`listening on port: ${PORT}`);
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
