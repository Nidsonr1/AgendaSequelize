const express = require('express');
const connection = require('./database/connection')
const app = express();
const routes = require('./routes');

try {
  connection.authenticate().then(() => {
    console.log('Connection has been established successfully.') ;
    app.emit('Already')
  })
} catch(error) {
  console.log('Unable to connect to the database:', error)
}

app.use(express.json());
app.use(routes);

app.on('Already', () => {
  app.listen(3333, () => {
    console.log('Server is Running')
  });
});


