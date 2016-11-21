const React = require('react')
const {Link, Redirect} = require('react-router')
const labelStyle = { display: 'block', color: 'red' }
const inputStyle = {display: 'block', color: 'gray', background: 'light-gray', width: '200px', height: '30px'}
const textInputStyle = {display: 'block', color: 'gray', background: 'light-gray', width: '200px', height: '120px'}
const xhr = require('xhr')

const LocationForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      country: '',
      lat: '',
      lng: ''
    }
  },
  handleChange(field) {
    return e => {
      const newState = {}
      newState[field] = e.target.value
      this.setState(newState)
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.id) {
      xhr.put('http://localhost:4000/locations/' + this.state.id, {
        json: this.state
      }, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
    } else {
      xhr.post('http://localhost:4000/locations', {
        json: this.state
      }, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      xhr.get('http://localhost:4000/locations/' + this.props.params.id,
        {json: true}, (err, res, location) => {
          if (err) return console.log(err.message)
          this.setState(location)
        })
    }
  },
  render() {
    const formState = this.state.id ? 'Edit' : 'New'
    return (
      <div className='pa4 bg-light-silver'>
      {this.state.success ? <Redirect to='/locations' /> : null}
        <h1>{formState} Location Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle}>Location Name</label>
            <input style={inputStyle}
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Country</label>
            <input style={inputStyle}
              onChange={this.handleChange('country')}
              value={this.state.country}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Latitude</label>
            <input style={inputStyle}
              onChange={this.handleChange('lat')}
              value={this.state.lat}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Longitude</label>
            <input style={inputStyle}
              onChange={this.handleChange('lng')}
              value={this.state.lng}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Start Date</label>
            <input style={inputStyle}
              onChange={this.handleChange('start')}
              value={this.state.start}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>End</label>
            <input style={inputStyle}
              onChange={this.handleChange('end')}
              value={this.state.end}
              type="text" />
          </div>
          <div>
              <button className='br2 bg-white pa2 mt2 mr2 fl'>Save</button>
            <div className='br2 bg-white pa2 mt2 mr2 dib'>
              <Link to="/locations">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = LocationForm
