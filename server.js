//dependencies

const express = require("express");
const fs = require("fs");
const path = require("path");

//express server is created

const app = express();
const PORT = process.env.PORT || 3001;

//setting Express app up to handle data parsing
//static middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// app.use('/api', require('./routes/apiRoutes'))
// app.use('/', require('./routes/htmlRoutes'))

//Listen

app.listen(PORT, () => {
  console.log(`API server is ready on port http://localhost:${PORT}`);
});
