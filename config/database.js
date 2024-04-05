const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connectedto MongoDB ${db.name} at ${db.host}:${db.port}`);
})