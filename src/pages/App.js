import NavigationBar from './components/NavigationBar'
import './css/App.css';

import { Switch, Route } from 'react-router-dom';


import About from './About';
import PirateBay from './PirateBay';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/bay" component={PirateBay} />
        <Route exact path="/profile" component={Profile} />
      </Switch> 
    </div>
  );
}

export default App;
