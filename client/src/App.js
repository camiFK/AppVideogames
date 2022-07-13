
import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import AddGame from './components/AddVideogame/AddGame';
import Error from './components/About/Error';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route exact path='/detail/:id' element={<Detail />} /> 
      <Route path='/create' element={<AddGame />} />
      <Route path='*' element={<Error/>} />
    </Routes>
  );
}

export default App;
