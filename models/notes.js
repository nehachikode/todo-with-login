const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: Number, required: true }
});

module.exports = mongoose.model('Notes', NotesSchema);