const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Established a connection to the database'))
    .catch(err =>
        console.log('Something went wrong when connecting to the database', err)
    );
