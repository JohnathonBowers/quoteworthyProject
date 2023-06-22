require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

require('./config/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/quotation.routes')(app);
require('./routes/user.routes')(app);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
