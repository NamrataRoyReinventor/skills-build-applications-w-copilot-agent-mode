"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';
const seed = async () => {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        User_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    const users = await User_1.default.insertMany([
        {
            username: 'ava_runner',
            email: 'ava.runner@example.com',
            profileImage: 'https://images.example.com/profiles/ava.jpg',
            points: 820,
        },
        {
            username: 'liam_lifter',
            email: 'liam.lifter@example.com',
            profileImage: 'https://images.example.com/profiles/liam.jpg',
            points: 910,
        },
        {
            username: 'maya_cyclist',
            email: 'maya.cyclist@example.com',
            profileImage: 'https://images.example.com/profiles/maya.jpg',
            points: 760,
        },
    ]);
    const teams = await Team_1.default.insertMany([
        {
            name: 'Cardio Crushers',
            description: 'High-energy runners and cyclists focused on endurance.',
            members: [users[0]._id, users[2]._id],
            score: 1580,
        },
        {
            name: 'Iron Icons',
            description: 'Strength athletes driving consistent weekly PRs.',
            members: [users[1]._id],
            score: 910,
        },
    ]);
    await Activity_1.default.insertMany([
        {
            user: users[0]._id,
            type: 'Run',
            durationMinutes: 42,
            calories: 490,
            performedAt: new Date('2026-06-12T06:45:00.000Z'),
        },
        {
            user: users[1]._id,
            type: 'Strength Training',
            durationMinutes: 55,
            calories: 420,
            performedAt: new Date('2026-06-13T17:30:00.000Z'),
        },
        {
            user: users[2]._id,
            type: 'Cycling',
            durationMinutes: 65,
            calories: 610,
            performedAt: new Date('2026-06-14T08:00:00.000Z'),
        },
        {
            user: users[0]._id,
            type: 'HIIT',
            durationMinutes: 28,
            calories: 340,
            performedAt: new Date('2026-06-15T18:10:00.000Z'),
        },
    ]);
    await Workout_1.default.insertMany([
        {
            title: 'Sunrise Tempo Run',
            difficulty: 'intermediate',
            durationMinutes: 45,
            tags: ['cardio', 'running', 'endurance'],
            recommendedFor: ['fat-loss', 'stamina'],
        },
        {
            title: 'Full Body Barbell Builder',
            difficulty: 'advanced',
            durationMinutes: 60,
            tags: ['strength', 'compound', 'gym'],
            recommendedFor: ['muscle-gain', 'power'],
        },
        {
            title: 'Low Impact Core Circuit',
            difficulty: 'beginner',
            durationMinutes: 25,
            tags: ['core', 'home', 'mobility'],
            recommendedFor: ['beginners', 'recovery-days'],
        },
    ]);
    await Leaderboard_1.default.insertMany([
        {
            entityType: 'user',
            entityId: users[1]._id,
            points: users[1].points,
            rank: 1,
        },
        {
            entityType: 'user',
            entityId: users[0]._id,
            points: users[0].points,
            rank: 2,
        },
        {
            entityType: 'team',
            entityId: teams[0]._id,
            points: teams[0].score,
            rank: 1,
        },
        {
            entityType: 'team',
            entityId: teams[1]._id,
            points: teams[1].score,
            rank: 2,
        },
    ]);
    console.log('Seed complete: users, teams, activities, leaderboard, and workouts inserted.');
};
seed()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
