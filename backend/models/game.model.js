const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    status: {type: String, required: true, enum: ['published', 'unpublished'], default: 'unpublished'},
    minimumRequirements: {
        processor: {type: String, required: true},
        memory: {type: String, required: true},
        graphics: {type: String, required: true}
    },
    recommendedRequirements: {
        processor: {type: String, required: true},
        memory: {type: String, required: true},
        graphics: {type: String, required: true}
    },
    developer: {type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true}
});

// Middleware para actualizar updatedAt antes de cada save
gameSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

module.exports = mongoose.model('Game', gameSchema);