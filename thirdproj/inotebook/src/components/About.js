import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';

function About() {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update();
    // eslint-disable-next-line
  },[]);
  return (
    <div>
      Name : {a.state.name} and reg number : {a.state.reg}
    </div>
  )
}

export default About
