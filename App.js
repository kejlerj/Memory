import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { hotjar } from 'react-hotjar';
import Menu from './Menu';
import Game from './Game';
import './font.css';

function App() {

  useEffect(() => {
    hotjar.initialize(2092093, 6);
  }, [])

  return (
    <div className="memory">
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Menu} />
            <Route exact path='/game' component={Game} />
            {/*<Route component={Notfound} />*/}
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  )
}

export default App;


