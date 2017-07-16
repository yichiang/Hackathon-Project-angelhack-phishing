import React, { Component } from 'react';
import { Accordion, Grid, Image, Card, Icon, Input, Menu, Segment, Table, Checkbox, Button } from 'semantic-ui-react'
import {PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './App.css';
import {links} from './linkData';
// var ReactHighmaps = require('react-highcharts/ReactHighmaps.src');
// var Highlight = require('react-highlight');
// var ReactDOM = require('react-dom');
// var maps = require('./mapdata/europe'
const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                  {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                  {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

const panels = [
{
  title: `Immediate Attention Required`,
  color: 'red',
  className: 'green',
 content: links.filter(t=>t.danger ===1).map(x=> x.link + ", "),
},
{
  title: `Review required`,
   color: 'orange',
   className: 'green',
   content: links.filter(t=>t.danger ===2).map(x=> x.link + ", "),
},
{
  title: 'Safe URL',
  color: 'green',
  className: 'green',
  content: links.filter(t=>t.danger ===3).map(x=> x.link + ", "),
},
]
const data = [
      {name: '7/1', thisYear: 40, lastYear: 23, amt: 2400},
      {name: '7/2', thisYear: 30, lastYear: 23, amt: 2210},
      {name: '7/3', thisYear: 20, lastYear: 22, amt: 2290},
      {name: '7/4', thisYear: 20, lastYear: 33, amt: 2000},
      {name: '7/5', thisYear: 10, lastYear: 33, amt: 2181},
      {name: '7/6', thisYear: 23, lastYear: 32, amt: 2500},
      {name: '7/7', thisYear: 34, lastYear: 11, amt: 2100},
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
 handleItemClick2 = (e, { name }) => this.setState({ activeItem2: name })

 componentDidMount() {


 }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { activeItem, activeItem2 } = this.state
    var dangerIndex =1;
    if(activeItem2 === 'information2'){
      dangerIndex = 2;

    }else if(activeItem2 === 'information3'){
        dangerIndex = 3;

      }
    return (
      <div className="container">
        {/* {
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
        } */}
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
            {activeItem === 'report'&&
          <div>
            <Grid celled>
                <Grid.Row>
                  <Grid.Column width={4} className="borderNone">
                    <Menu vertical>
                            <Menu.Item>
                              <Menu.Header>
                                <Icon name='warning circle' color='red' />
                                Danger
                              </Menu.Header>

                              <Menu.Menu>
                                <Menu.Item content="links" name='information1' active={activeItem2 === 'information1'} onClick={this.handleItemClick2} />
                              </Menu.Menu>
                            </Menu.Item>

                            <Menu.Item>
                              <Menu.Header>
                                <Icon name='warning sign' color='orange' />
                                Warning
                              </Menu.Header>

                              <Menu.Menu>
                                <Menu.Item content="links" name='information2' active={activeItem2 === 'information2'} onClick={this.handleItemClick2} />
                              </Menu.Menu>
                            </Menu.Item>

                            <Menu.Item>
                              <Menu.Header>
                                <Icon name='check circle' color='green' />
                                Safe
                              </Menu.Header>
                              <Menu.Menu>
                                <Menu.Item content="links" name='information3' active={activeItem2 === 'information3'} onClick={this.handleItemClick2} />
                              </Menu.Menu>
                            </Menu.Item>

                            <Menu.Item>
                              <Menu.Header>Support</Menu.Header>

                              <Menu.Menu>
                                <Menu.Item name='admin' active={activeItem === 'admin'} onClick={this.handleItemClick}>
                                  Users
                                </Menu.Item>

                                <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick}>
                                  FAQs
                                </Menu.Item>
                              </Menu.Menu>
                            </Menu.Item>
                          </Menu>

                  </Grid.Column>
                  <Grid.Column width={12} className="borderNone">
                            <Card.Group>

                                {links.filter(x => x.danger===dangerIndex).map((t, index) => {

                                  return (
                                    <Card>
                                    {t.danger === dangerIndex &&
                                      <Card.Content>
                                        {/* <Card.Header>{index}</Card.Header> */}
                                        <Card.Meta>
                                          {t.danger == 1 &&
                                            <Icon name='warning circle' color='red' />
                                          }
                                          {t.danger == 2 &&
                                            <Icon name='warning sign' color='orange' />
                                          }
                                          {t.danger == 3 &&
                                            <Icon name='check circle' color='green' />
                                          }
                                          <span className="country">
                                            From
                                            <span>
                                              {t.origin}
                                            </span>
                                          </span>
                                        </Card.Meta>
                                        <Card.Description>{t.link}</Card.Description>
                                     </Card.Content>
                                    }
                                  </Card>
                                  )

                                })}

                             </Card.Group>

                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            }
            {activeItem === 'admin' &&
            <Segment>
              <Table compact celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Registration Date</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
          <Table.HeaderCell>Premium Plan</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>Yi</Table.Cell>
          <Table.Cell>Feb 02, 2017</Table.Cell>
          <Table.Cell>yi@hackathon.com</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>Zack</Table.Cell>
          <Table.Cell>Feb 11, 2017</Table.Cell>
          <Table.Cell>zack@hackathon.com</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>Black</Table.Cell>
          <Table.Cell>May 11, 2017</Table.Cell>
          <Table.Cell>black@yahoo.com</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='4'>
            <Button floated='right' icon labelPosition='left' primary size='small'>
              <Icon name='user' /> Add User
            </Button>
            <Button size='small'>Approve</Button>
            <Button disabled size='small'>Approve All</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
            </Segment>

            }
            {activeItem === 'report'&&
            // <Segment>
              <Grid celled>
                  <Grid.Row>
                    <Grid.Column width={9} className="borderNone">
                      <Icon name='dashboard' />
                      Overview

                            <LineChart width={600} height={300} data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                           <XAxis dataKey="name"/>
                           <YAxis/>
                           <CartesianGrid strokeDasharray="3 3"/>
                           <Tooltip/>
                           <Legend />
                           <Line type="monotone" dataKey="thisYear" stroke="#8884d8" activeDot={{r: 8}}/>
                           <Line type="monotone" dataKey="lastYear" stroke="#82ca9d" />
                         </LineChart>
                    </Grid.Column>
                    <Grid.Column width={7} className="borderNone">

                      <Accordion panels={panels} className="customerAccordion" styled />

                    </Grid.Column>
                  </Grid.Row>
                </Grid>
            // </Segment>

            }
            {activeItem === 'warning' &&


              <Segment>
                <PieChart width={800} height={400}>
                  <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                  {/* <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/> */}
                  <Tooltip/>
               </PieChart>
              </Segment>
            }


          </div>
      </div>
    );
  }
}

export default Home;
