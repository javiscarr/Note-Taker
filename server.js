//dependency

const express = require('express');

//directs server to route files

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//express server is created

const app = express();

//setting PORT

const PORT = process.env.PORT || 3001;

//setting Express app up to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//Listen

app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});


