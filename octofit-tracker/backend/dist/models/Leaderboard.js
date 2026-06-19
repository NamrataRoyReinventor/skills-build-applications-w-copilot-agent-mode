"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    entityType: { type: String, enum: ['user', 'team'], required: true },
    entityId: { type: mongoose_1.Types.ObjectId, required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
