import React from 'react';
import './font.css';
import Game from './Game';

class App extends React.Component {

  render() {    
    return (
      <div className="memory">
        <Game/>
      </div>
    )
  }
}

export default App;


