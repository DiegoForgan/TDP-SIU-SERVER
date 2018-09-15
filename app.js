var express = require('express');
var app = express();

//librerias propias
var admin = require('./routes/admin.js');

//public
app.use('/admin', express.static("public"));

//router
app.use('/admin', admin);


const PORT = process.env.PORT || 8080;


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log('Servido escuchando en el puerto: ' + PORT);
});
