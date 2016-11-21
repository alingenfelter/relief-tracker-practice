const React = require('react')
const xhr = require('xhr')
const { Link, Redirect} = require('react-router')


const Location = React.createClass({
  getInitialState: function() {
    return {
      location: {}
    }
  },
  componentDidMount() {
    xhr.get('http://localhost:4000/locations/' +
      this.props.params.id, {
        json: true
      }, (err, response, location) => {
        if (err) return console.log(err.message)
        this.setState({location})
      }
    )
  },
  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure?') ) {
      xhr.del('http://localhost:4000/locations/' + this.state.location.id, {
        json: this.state.location
      }, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({removed: true})
      })
    }
  },
  render() {
    return (
      <div className='bg-light-silver'>
        { this.state.removed ? <Redirect to='/locations' /> : null}
        <h3>{this.state.location.name}</h3>
        <div className='ba bw1 bg-light-gray b--silver br2 pa2'>
          <p>Country: {this.state.location.country}</p>
          <p>Latitude: {this.state.location.lat}</p>
          <p>Longitude: {this.state.location.lng}</p>
        </div>
        <div className='br2 bg-white pa2 mt2 mr2 mb2 dib fl'>
          <Link to={`/locations/${this.state.location.id}/edit`}>Edit Location</Link>
        </div>
        <div>
          <button className='br2 bg-white pa2 mt2 mb2 mr2 fl' onClick={this.handleRemove}>Remove</button>
        </div>
        <div className='br2 bg-white pa2 mt2 mr2 mb2 dib'>
          <Link to='/locations'>Return</Link>
        </div>
      </div>

    )
  }
})

module.exports = Location
