import React, { Component } from 'react';
import { Navbar, Button, Nav, NavItem } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Capture Fishing Site</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {/* <Navbar.Collapse> */}
              <Nav pullRight>
                {
                  !isAuthenticated() && (
                      <NavItem
                        // bsStyle="primary"
                        // className="btn-margin"
                        onClick={this.login.bind(this)}
                      >
                        Log In
                      </NavItem>
                    )
                }
                {/* <NavItem eventKey={1} href="#"></NavItem> */}
                {/* <NavItem eventKey={2} href="#">Link Right</NavItem> */}
                {
                  isAuthenticated() && (
                      <NavItem
                        // bsStyle="primary"
                        // className="btn-margin"
                        onClick={this.logout.bind(this)}
                      >
                        Log Out
                      </NavItem>
                    )
                }
              </Nav>

            {/* </Navbar.Collapse> */}
          </Navbar.Header>
        </Navbar>

      </div>
    );
  }
}

export default App;
