const mongoose = require('mongoose');

const TacheSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    status: {
        type: String,
        enum: ['In Progress', 'Done', 'Uncompleted'],
    },
    order: { type: Number },
    // order: {
    //     type: Number,
    //     required: true,
    //   },
});

module.exports = mongoose.model('Tache', TacheSchema);