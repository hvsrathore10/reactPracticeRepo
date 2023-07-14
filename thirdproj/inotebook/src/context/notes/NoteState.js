import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "64b1749c991bd3e2d7bd535a",
          "user": "64af11fb02ac79f8503c92cb",
          "title": "My title",
          "description": "Testing add new notes feature",
          "tag": "Test",
          "date": "2023-07-14T16:15:24.860Z",
          "__v": 0
        },
        {
          "_id": "64b174d5991bd3e2d7bd535c",
          "user": "64af11fb02ac79f8503c92cb",
          "title": "2 Title Entered",
          "description": "Making a good database with 2nd note",
          "tag": "Test",
          "date": "2023-07-14T16:16:21.013Z",
          "__v": 0
        },
        {
          "_id": "64b174df991bd3e2d7bd535e",
          "user": "64af11fb02ac79f8503c92cb",
          "title": "3 Title Entered",
          "description": "Making a good database with 3nd note",
          "tag": "Test",
          "date": "2023-07-14T16:16:31.180Z",
          "__v": 0
        },
        {
          "_id": "64b174ed991bd3e2d7bd5360",
          "user": "64af11fb02ac79f8503c92cb",
          "title": "4 Title Entered",
          "description": "Making a good database with 4th note",
          "tag": "Test",
          "date": "2023-07-14T16:16:45.074Z",
          "__v": 0
        }
      ]
    const [notes,setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState