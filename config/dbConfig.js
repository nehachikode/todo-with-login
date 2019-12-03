const mongoose = require('mongoose');

let con = mongoose.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = con;