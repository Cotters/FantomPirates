import NavigationBar from './components/NavigationBar'

import { Switch, Route } from 'react-router-dom';

import game from '../blockchain/game';

import About from './About';
import PirateBay from './PirateBay';
import Profile from './Profile';
import HallOfKings from './HallOfKings';

import './css/App.css';

function App() {
  return (
    <div>
      <NavigationBar contractAddress = {game._address} />
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/bay" component={PirateBay} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/hall-of-kings" component={HallOfKings} />
      </Switch> 
    </div>
  );
}

export default App;
