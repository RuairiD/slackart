import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from 'react-bootstrap/Button';
import Canvas from './components/Canvas/Canvas';

function App() {
  return (
    <div className="App">
      <Canvas width={16} height={16} pallette={['#FF0000', '#0000FF']}/>
    </div>
  );
}

export default App;
