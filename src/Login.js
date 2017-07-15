import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import {Form, FormGroup, Checkbox, FormControl, ControlLabel, Button, ButtonToolbar, Grid, Row, Col, Well } from 'react-bootstrap'
// import AuthService from 'utils/AuthService'
import Auth from './Auth/Auth';

export class Login extends React.Component {
  static contextTypes = {
    router: T.object,
    // showAccountWidget: false,
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(Auth)
  }

  state ={
    showAccountWidget: false,
  }

  getAuthParams() {
    return {
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
  }

  login(e) {
    e.preventDefault()
    const { email, password } = this.getAuthParams()
    this.props.auth.login(email, password)
  }

  signup() {
    const { email, password } = this.getAuthParams()
    this.props.auth.signup(email, password)
  }

  loginWithGoogle() {
    this.props.auth.loginWithGoogle();
  }

  toggleAccountWidget(){
    this.setState({showAccountWidget: !this.state.showAccountWidget})
  }

  render() {
    return (
      <div>
    Login
      </div>
    )
  }
}

export default Login;
