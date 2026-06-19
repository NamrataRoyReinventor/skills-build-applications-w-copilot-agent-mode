"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    tags: [{ type: String, trim: true }],
    recommendedFor: [{ type: String, trim: true }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
