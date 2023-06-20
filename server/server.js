const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

require('dotenv').config();

require('./config/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/quotation.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
