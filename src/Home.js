import React, { Component } from 'react';
import { Icon, Input, Menu, Segment } from 'semantic-ui-react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
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
                        <Menu.Header>Header A</Menu.Header>

                        <Menu.Menu>
                          <Menu.Item name='enterprise' active={activeItem2 === 'enterprise'} onClick={this.handleItemClick} />
                          <Menu.Item name='consumer' active={activeItem2 === 'consumer'} onClick={this.handleItemClick} />
                        </Menu.Menu>
                      </Menu.Item>

                      <Menu.Item>
                        <Menu.Header>Header B</Menu.Header>

                        <Menu.Menu>
                          <Menu.Item name='normal' active={activeItem2 === 'normal'} onClick={this.handleItemClick} />
                          <Menu.Item name='warning' active={activeItem2 === 'warning'} onClick={this.handleItemClick} />
                          <Menu.Item name='danger' active={activeItem2 === 'danger'} onClick={this.handleItemClick} />
                        </Menu.Menu>
                      </Menu.Item>

                      <Menu.Item>
                        <Menu.Header>Header C</Menu.Header>

                        <Menu.Menu>
                          <Menu.Item name='shared' active={activeItem2 === 'shared'} onClick={this.handleItemClick} />
                          <Menu.Item name='remove' active={activeItem2 === 'remove'} onClick={this.handleItemClick} />
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
            <Icon name='dashboard' />
            Overview

            <LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
          </Segment>
          </div>
      </div>
    );
  }
}

export default Home;
