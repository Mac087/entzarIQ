import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//----------------------------------------
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from './utils/setAuthToken';
// import { setCurrentUser, logoutUser } from './actions/authActions';
// import { clearCurrentProfile } from './actions/profileActions';


//----------------------------------------

// import store from './store';
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Landing from './components/Landing.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
//-------------------------------------------

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />

          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} /> */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));






/*


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}


*/



