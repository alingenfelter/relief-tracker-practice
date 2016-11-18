const React = require('react')
const {Link} = require('react-router')

const Home = React.createClass({
  render() {
    return(
      <div>
        <h1>Welcome Home</h1>
        <div>
          <h3>Menu</h3>
          <ul>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/persons'>People</Link></li>
            <li><Link to='/efforts'>Relief Efforts</Link></li>
            <li><Link to='/locations'>Locations</Link></li>
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = Home
