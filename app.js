const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('./public'));

app.get('/api/v1/', (req, res) => {
    res.status(200).json({item: 'requrest', status: 'success'});
})

app.listen(port, () => {console.log(`The server is listening on port ${port}`)});   