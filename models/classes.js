import mongoose from 'mongoose';

const classSchema = mongoose.Schema({
    name: String,
    Section: String,
    Subject: String,
    Room: String,
    Count: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var ClassMessage = mongoose.model('PostMessage', classSchema);

export default ClassMessage;