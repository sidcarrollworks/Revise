import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class Testu extends Component {
  render() {
    return (
      <h1>im BITCH -_____^^^^^______-</h1>
    );
  }
}
class Home extends Component {
  render() {
    return (
      <h1>Hello dude</h1>
    );
  }
} 
class Nick extends Component {
  render() {
    return (
      <h1>im nick -______________-</h1>
    );
  }
}
class Four_0_4 extends Component {
  render() {
    return (
      <h1>404 ERROR</h1>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Home} />
        <Switch>
          <Route exact path="/" component={Nick} />
          <Route path="/sss" component={Testu} />
          <Route component={Four_0_4} />
        </Switch>
      </div>
    );
  }
}


export default App;
