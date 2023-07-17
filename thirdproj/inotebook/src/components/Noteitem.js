import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import contextValue from '../context/notes/NoteContext';

function Noteitem(props) {
  const context = useContext(contextValue);
  const { deleteNote, editNote } = context;

  const { note } = props;

  return (
    <div className='col-md-3 my-3'>
      <div className="card" style={{width:'300px'}}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{note.description}</h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <Link to="/" className="card-link mx-2">Open Note</Link>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}} ></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editNote(note._id,note.title,note.description,note.tag)} } ></i>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
