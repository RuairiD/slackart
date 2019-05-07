import React from 'react';
import './App.css';
import queryString from 'query-string';

import Studio from './components/Studio/Studio';


function App() {
    const savedEncImage = queryString.parse(window.location.search)['image'];
    return (
        <div className="App">
            <Studio savedEncImage={savedEncImage} />
        </div>
    );
}

export default App;
