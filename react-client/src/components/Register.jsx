import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
      //errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    const redirect = this.props.history;

    axios
        .post('/api/users/register', newUser)
        .then(res => redirect.push('/login'))
        .catch(err =>console.log(err));
    
  }

  render() {
    //const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your EntzarIQ account
              </p>
              <form noValidate onSubmit={this.onSubmit}>

                <div className="form-group">
                  <input placeholder="First Name" className="form-control form-control-lg" name="firstName" value={this.state.firstName} onChange={this.onChange}></input>
                </div>

                <div className="form-group">
                  <input placeholder="Last Name" className="form-control form-control-lg" name="lastName" value={this.state.lastName} onChange={this.onChange}></input>
                </div>

                <div className="form-group">
                  <input placeholder="Email" className="form-control form-control-lg" name="email" value={this.state.email} onChange={this.onChange}></input>
                </div>

                <div className="form-group">
                  <input placeholder="Password" className="form-control form-control-lg" name="password" value={this.state.password} onChange={this.onChange}></input>
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

export default Register;