import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:2500'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


  //get all notes:
  const getNotes = async () => {
    //API Calls : 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *like : GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZjExZmIwMmFjNzlmODUwM2M5MmNiIn0sImlhdCI6MTY4OTIyMjE3Nn0.TdEoR5Ty07V2ANhz53oI5U9g8S9dI0EgjMLqd5ZDCbQ"
      }
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(json);
  }

  //Add a note:
  const addNote = async (title, description, tag) => {
    //API Calls : 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *like : GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZjExZmIwMmFjNzlmODUwM2M5MmNiIn0sImlhdCI6MTY4OTIyMjE3Nn0.TdEoR5Ty07V2ANhz53oI5U9g8S9dI0EgjMLqd5ZDCbQ"
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(notes.concat(note));
  }

  //Delete a note:
  const deleteNote = async (id) => {
    //API Calls : 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *like : GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZjExZmIwMmFjNzlmODUwM2M5MmNiIn0sImlhdCI6MTY4OTIyMjE3Nn0.TdEoR5Ty07V2ANhz53oI5U9g8S9dI0EgjMLqd5ZDCbQ"
      }
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    
    console.log("Delete note with id : " + id);
    console.log(json);
    const newNote = notes.filter((note) => { return note._id !== id }); //filter function will find note will give id and delete in frontend and backend
    setNotes(newNote);
  }

  //Edit a note:
  const editNote = async (id, title, description, tag) => {
    //API Calls : 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *like : GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZjExZmIwMmFjNzlmODUwM2M5MmNiIn0sImlhdCI6MTY4OTIyMjE3Nn0.TdEoR5Ty07V2ANhz53oI5U9g8S9dI0EgjMLqd5ZDCbQ"
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    
    const newNote = JSON.parse(JSON.stringify(notes));
    //Logic to edit client:
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  }


  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState