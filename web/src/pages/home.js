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
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = Home
