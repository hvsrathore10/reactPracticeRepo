import React, { useContext } from 'react'
import contextValue from '../context/notes/NoteContext'
import Noteitem from './Noteitem';

function Notes() {
    const context = useContext(contextValue);
    const { notes, setNotes } = context;
    return (
        <div className='container row my-3'>
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes
