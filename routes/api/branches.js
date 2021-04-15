const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

// branch model
const Branches = require('../../models/Branch')

// routes GET api/branches
// GET ALL  branch
router.get(('/'), async (req, res) => {
    try {
        const branches = await Branches.find();
        if (!branches) throw Error('No item')
        res.status(200).json(branches)
    } catch (err) {
        res.status(400).json({ message: err })
    }
});

// routes GET api/branches/:id
// GET a branch
router.get(('/:id'), async (req, res) => {
    try {
        const branch = await Branches.findById(req.params.id);
        if (!branch) throw Error('No item');
        res.status(200).json(branch);
    } catch (err) {
        res.status(400).json({ msg: err })
    }
});

// routes POST api/branches
// Create an branch

router.post('/', verify, async (req, res) => {
    const newBranch = new Branches(req.body);

    try {
        const branch = await newBranch.save();
        if (!branch) throw Error('Something went wrong!!!');

        res.status(200).json(branch);
    } catch {
        res.status(400).json({ message: error })
    }
});

// routes DELETE api/branches/:id
// DELETE  branch
router.delete(('/:id'), verify, async (req, res) => {
    try {
        const branch = await Branches.findByIdAndDelete(req.params.id);
        if (!branch) throw Error('No branch found!!');
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({ message: error })
    }
});

// routes UPDATE api/branches/:id
// UPDATE branch
router.patch('/:id', verify, async (req, res) => {
    try {
        const branch = await Branches.findByIdAndUpdate(req.params.id, req.body);
        if (!branch) throw Error('Something went wrong while updating');

        res.status(200).json({ success: true })

    } catch {
        res.status(400).json({ message: err })
    }
})


module.exports = router;