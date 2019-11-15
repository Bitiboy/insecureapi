const express = require('express')
const app = express()
const api = require('./src/api');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 5000;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
//app.use('/api', api);
app.use(api);

app.listen(port, () => console.log('Example app listening on port %s!', port))
