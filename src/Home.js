import React, { Component } from 'react';
import { Input, Menu, Segment } from 'semantic-ui-react'

const items = [
  { key: 'editorials', active: true, name: 'Editorials' },
  { key: 'review', name: 'Reviews' },
  { key: 'events', name: 'Upcoming Events' },
]
class Home extends Component {
  login() {
    this.props.auth.login();
  }
  state = { activeItem: 'report', activeItem2: 'shared' }

 handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { isAuthenticated } = this.props.auth;
    const { activeItem, activeItem2 } = this.state

    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in!
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
        <div>
          <Menu pointing>
              <Menu.Item name='report' active={activeItem === 'report'} onClick={this.handleItemClick} />
              <Menu.Item name='warning' active={activeItem === 'warning'} onClick={this.handleItemClick} />
              <Menu.Item name='news' active={activeItem === 'news'} onClick={this.handleItemClick} />
              <Menu.Item name='contact us' active={activeItem === 'contact us'} onClick={this.handleItemClick} />
              <Menu.Menu position='right'>
                <Menu.Item>
                  <Input icon='search' placeholder='Search...' />
                </Menu.Item>
              </Menu.Menu>
            </Menu>

            <Segment>
              <Menu vertical>
                      <Menu.Item>
                        <Menu.Header>Products</Menu.Header>

                        <Menu.Menu>
                          <Menu.Item name='enterprise' active={activeItem2 === 'enterprise'} onClick={this.handleItemClick} />
                          <Menu.Item name='consumer' active={activeItem2 === 'consumer'} onClick={this.handleItemClick} />
                        </Menu.Menu>
                      </Menu.Item>

                      <Menu.Item>
                        <Menu.Header>CMS Solutions</Menu.Header>

                        <Menu.Menu>
                          <Menu.Item name='rails' active={activeItem2 === 'rails'} onClick={this.handleItemClick} />
                          <Menu.Item name='python' active={activeItem2 === 'python'} onClick={this.handleItemClick} />
                          <Menu.Item name='php' active={activeItem2 === 'php'} onClick={this.handleItemClick} />
                        </Menu.Menu>
                      </Menu.Item>

                      <Menu.Item>
                        <Menu.Header>Hosting</Menu.Header>

                        <Menu.Menu>
                          <Menu.Item name='shared' active={activeItem2 === 'shared'} onClick={this.handleItemClick} />
                          <Menu.Item name='dedicated' active={activeItem2 === 'dedicated'} onClick={this.handleItemClick} />
                        </Menu.Menu>
                      </Menu.Item>

                      <Menu.Item>
                        <Menu.Header>Support</Menu.Header>

                        <Menu.Menu>
                          <Menu.Item name='email' active={activeItem === 'email'} onClick={this.handleItemClick}>
                            E-mail Support
                          </Menu.Item>

                          <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick}>
                            FAQs
                          </Menu.Item>
                        </Menu.Menu>
                      </Menu.Item>
                    </Menu>

            </Segment>
          <Segment>
            Overview
          </Segment>
          </div>
      </div>
    );
  }
}

export default Home;
