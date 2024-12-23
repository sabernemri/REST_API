const express = require('express');
const mongoose= require("mongoose"); 
const router = express.Router();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] },
});

const User = mongoose.model('User', userSchema);

// get 
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users', details: err.message });
    }
});

//  POST
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: 'Error creating user', details: err.message });
    }
});

//  PUT
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: 'Error updating user', details: err.message });
    }
});

//  DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user', details: err.message });
    }
});

module.exports = router;
