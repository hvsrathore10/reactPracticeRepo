import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        />
        <Routes>
          <Route exact path="/" element={<News  setProgress={this.setProgress} key="general" pageSize={9} category="general" active="active" />} />
          <Route exact path="/business" element={<News  setProgress={this.setProgress} key="business" pageSize={6} category="business"/>} />  
          <Route exact path="/entertainment" element={<News  setProgress={this.setProgress} key="entertainment" pageSize={6} category="entertainment"/> } />
          <Route exact path="/health" element={ <News  setProgress={this.setProgress} key="health" pageSize={6} category="health"/> } />
          <Route exact path="/science" element={<News  setProgress={this.setProgress} key="science" pageSize={6} category="science"/> } />
          <Route exact path="/sports" element={<News  setProgress={this.setProgress} key="sports" pageSize={6} category="sports"/> } />
          <Route exact path="/technology" element={<News  setProgress={this.setProgress} key="technology" pageSize={6} category="technology"/> } />
        </Routes>
      </div>
      </BrowserRouter>
    )
  }
}

// export default App;
