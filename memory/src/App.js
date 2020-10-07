import React from 'react';
import Field from './Field'
import GuessCount from './GuessCount'

class App extends React.Component {

  render() {
    const won = new Date().getSeconds() % 2 === 0;
    
    return (
      <div className="memory">
        <GuessCount guesses={0} />
        <Field></Field>
      </div>
    )
  }
}

export default App;


