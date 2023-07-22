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


//Route 3: Updating an exiting Note using PUT "/api/notes/updatenote" Login required 
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    const {title,description,tag} = req.body;
    //create a newNote object
    const newNote = {};
    if(title){{newNote.title = title}}
    if(description){{newNote.description = description}}
    if(tag){{newNote.tag = tag}}

    //check for correct uses with it's own notes only
    let note = await Notes.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    //find the note to be updated and update it
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new: true});
    res.json({note});
})


//Route 4: Deleting an exiting Note using DELETE "/api/notes/deletenote" Login required 
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    
    //find the note to be delete and delete it
    //check for correct uses with it's own notes only
    let note = await Notes.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")}
    
    //Allowed deletion only if user own this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success" : "Note as been deleted"});
    // res.json({note})
})


module.exports = router