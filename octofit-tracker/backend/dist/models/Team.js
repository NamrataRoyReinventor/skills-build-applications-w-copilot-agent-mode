"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Team', teamSchema);
