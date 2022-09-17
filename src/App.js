import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './pages/style.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-geral">
          {/* <p>TrybeTunes </p> */}
          <Switch>

            <Route exact path="/" component={ Login } />

            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile" component={ Profile } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
