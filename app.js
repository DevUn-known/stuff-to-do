// Package imports
const express = require('express');
const cookieParser = require('cookie-parser');
const expressSanitizer = require('express-sanitizer');
require('dotenv').config();
require('express-async-errors');

// Local imports
const connectDb = require('./db/connect.js');
const notFoundMiddleware = require('./middlewares/not-found.js');
const errorHandler = require('./middlewares/error-handler.js');
const authorize = require('./middlewares/authorize.js');
const { BadRequestError } = require('./errors/index.js');
const sanitizeObject = require('./helpers/sanitize.js');
const { StatusCodes } = require('http-status-codes');

// Import Routers
const authRouter = require('./routes/auth.js');
const listsRouter = require('./routes/lists.js');
const tasksRouter = require('./routes/tasks.js');

// global variables
const app = express();
const port = process.env.PORT || 5000;
const apiPath = '/api/v1/';

// Middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());
app.use(expressSanitizer());
app.use((req, res, next) => {
    ['body', 'params', 'query'].forEach(key => {
        if (req[key]) sanitizeObject(req[key]);
    });
    next();
})

// Routes
app.get(apiPath, (req, res) => {
    res.status(200).json({item: 'requrest', status: 'success'});
})

app.use(`${apiPath}auth`, authRouter);
app.use(`${apiPath}lists`, authorize, listsRouter);
app.use(`${apiPath}tasks`, authorize, tasksRouter);
// route to test if the user is logged in
app.use(`${apiPath}testauth`, authorize, (req, res) => {
    res.status(StatusCodes.OK).send(`you are logged in as '${req.user.username}'`);
});

// Error Handling
app.use(notFoundMiddleware);
app.use(errorHandler);

// Connect to db and start the server

const run = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => {console.log(`The server is listening on port ${port}`)});
    } catch (err) {
        console.log('failed to connect to the database...', err );
    }
}

run();