import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAccount } from '../../store/actions/index';
import './login.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      hasErrored: false,
    };
    this.errorText = 'Invalid username or password';
  }

  handleNameChange = (e) => {
    const target = e.target;
    const name = target.value;
    this.setState({ name });
  }

  handlePasswordChange = (e) => {
    const target = e.target;
    const password = target.value;
    this.setState({ password });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, password } = this.state;
    const json = {
      username: name,
      password,
    };
    fetch('https://productlocator.herokuapp.com/api/token', {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          const { user, token } = data;
          this.props.dispatch(setAccount(user));
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('account_name', user.username);
          window.localStorage.setItem('account_id', user.id);
          this.props.history.push('/');
        });
      } else {
        this.setState({
          hasErrored: true,
        });
      }
    });
  }



  // post user name ja password kentänt /token
  render() {
    return (
      <div className="product-locator-login-page">
        <div className="product-locator-login-container">
          <h1>
            Product locator Log In
          </h1>
          <h2>
            User name:
            <input type="text" value={this.state.name} onChange={this.handleNameChange} className="login-input" />
          </h2>
          <h2>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="login-input" />
          </h2>
          <button onClick={this.handleSubmit} className="product-locator-login-submit">
            Submit 
          </button>
          {this.state.hasErrored &&
          <p className="log-in-error-text">{this.errorText}</p>
          }
        </div>
      </div>
    );
  }
}

LogIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect()(LogIn);

