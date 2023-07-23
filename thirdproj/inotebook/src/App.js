import './App.css';
// import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';


function App() {
  // const [alert, setAlert] = useState(null);

  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 2000);
  // }
  return (
    <>
      {/* NoteState is applied for using context api */}
      <NoteState>
        {/* Adding router */}
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
