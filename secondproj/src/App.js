import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import ScrollToTop from "react-scroll-to-top"



export default function App() {
  const apikey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <ScrollToTop 
          smooth 
          style={{ background:'black', color:'white' , textAlign:'center'}}
          component={<p style={{ color: "white" }}>UP</p>} 
        />

        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={9} category="general" active="active" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={6} category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={6} category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={6} category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={6} category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={6} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={6} category="technology" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

// export default App;
