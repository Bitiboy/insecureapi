const express = require('express')
const app = express()

const cors = require('cors');
/*const corsOptions = {
    origin: 'https://mydomain.com'
  }*/
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const api = require('./src/api');
app.use(api);

const port = 5000;
app.listen(port, () => console.log('Example app listening on port %s!', port))
