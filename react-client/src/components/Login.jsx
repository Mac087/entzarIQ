import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    const redirect = this.props.history;

    axios
      .post('/api/users/login', userData)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        if (token) {
            // Apply to every request
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            // Delete auth header
            delete axios.defaults.headers.common['Authorization'];
        }
        // Decode token to get user data
        const decoded = jwt_decode(token);
        //console.log(decoded);
        redirect.push('/dashboard');
      })
      .catch(err => console.log(err));
    }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your EntzarIQ account
              </p>
              <form onSubmit={this.onSubmit}>
                
                 <div className="form-group">
                  <input autocomplete="off" placeholder="Email" className="form-control form-control-lg" name="email" value={this.state.email} onChange={this.onChange}></input>
                </div>

               <div className="form-group">
                  <input autocomplete="off" placeholder="Password" className="form-control form-control-lg" name="password" value={this.state.password} onChange={this.onChange}></input>
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;