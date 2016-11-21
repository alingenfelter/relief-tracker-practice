const React = require('react')
const {BrowserRouter, Match, Miss, Link} = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')
const Persons = require('./pages/persons')
const Person = require('./pages/persons/show')
const PersonForm = require('./pages/persons/form')
const Service = require('./components/service')
const Efforts = require('./pages/efforts')
const Effort = require('./pages/efforts/show')
const EffortForm = require('./pages/efforts/form')

const NoMatch = () => (
  <div>
    <h3>Page Not Found</h3>
    <Link to='/'>Home</Link>
  </div>
)

const App = React.createClass({
  render() {
    return(
      <BrowserRouter>
        <div>
          <Match exactly pattern='/' component={Home} />
          <Match pattern='/about' component={About} />
          <Match exactly pattern='/persons' component={Service(Persons)} />
          <Match exactly pattern="/persons/new" component={PersonForm} />
          <Match exactly pattern='/persons/:id/edit' component={PersonForm} />
          <Match pattern='/persons/:id/show' component={Service(Person)} />
          <Match exactly pattern='/efforts' component={Efforts} />
          <Match pattern='/efforts/:id/show' component={Effort} />
          <Match exactly pattern='/efforts/new' component = {EffortForm} />
          <Miss component={NoMatch} />
        </div>
      </BrowserRouter>

    )
  }
})

module.exports = App
