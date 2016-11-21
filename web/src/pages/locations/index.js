const React = require('react')
const {Link} = require('react-router')
const xhr = require('xhr')

const Locations = React.createClass({
  getInitialState: function() {
    return{
      locations: []
    }
  },
  componentDidMount() {
    xhr.get('http://localhost:4000/locations', {
      json: true
    }, (err, res, locations) => {
      if (err) return console.log(err.message)
      this.setState({locations})
    })
  },
  render() {
    const listLocations = location =>
      <li key={location.id}>
        <Link to={`/locations/${location.id}/show`}>
        {location.name}
        </Link>
      </li>
    return(
      <div className='bg-light-silver'>
        <h1>Locations</h1>
        <ul>
          {this.state.locations.map(listLocations)}
        </ul>
        <div className='br2 bg-white pa2 mt2 mb2 mr2 dib'>
          <Link to='/'>Home</Link>
        </div>
      </div>
    )
  }
})

module.exports = Locations
