const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get All the Notes using GET "/api/notes/fetchallnotes" Login required 
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error occured");
    }
})

//Route 2: Add new Notes using POST "/api/notes/addnotes" Login required 
router.post('/addnotes', fetchuser, [
    body('title','Enter a valid Title').isLength({min: 3}),
    body('description','Description must be atleast 5 Characters').isLength({min: 5})
], async (req,res)=>{
    //try-catch use to protact database from malfunctioning
    try {
        const {title,description,tag} = req.body;
        //If there are errors, return Bed Reqiust and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await notes.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error occured");
    }
})

module.exports = router