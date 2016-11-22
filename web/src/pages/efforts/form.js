const React = require('react')
const {Link, Redirect} = require('react-router')
const labelStyle = { display: 'block', color: 'red' }
const inputStyle = {display: 'block', color: 'gray', background: 'light-gray', width: '200px', height: '30px'}
const textInputStyle = {display: 'block', color: 'gray', background: 'light-gray', width: '200px', height: '120px'}
const xhr = require('xhr')

const TextField = require('../../components/TextField')

const EffortForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      phase: '',
      organizationID: '',
      desc: '',
      start: '',
      end: '',
      location_id: '',
      locations: [{id: '-1', name: 'choose'}]
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
    //to store effort value in DB, store value to variable then remove array
    //could also be handled by changing initial state to place
    //effort object (inc location_id) and locations array outside effort object.
    //would require updating render to this.state.effort.field
    let effort = [].concat(this.state)
    delete effort.locations

    if (this.state.id) {
      xhr.put('http://localhost:4000/efforts/' + this.state.id, {
        json: this.state
      }, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
    } else {
      xhr.post('http://localhost:4000/efforts', {
        json: this.state
      }, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
    }
  },
  componentDidMount() {
    //add to get locations
    xhr(process.env.REACT_APP_API + '/locations', {
      json: true
    }, (err, res, body) => {
      //console.log(body)
      if (err) return console.log(err.message)
      this.setState({locations:
        [].concat(this.state.locations,body)
      })
    })
    if (this.props.params.id) {
      xhr.get('http://localhost:4000/efforts/' + this.props.params.id,
        {json: true}, (err, res, effort) => {
          if (err) return console.log(err.message)
          this.setState(effort)
        })
    }
  },
  render() {
    const formState = this.state.id ? 'Edit' : 'New'
    //console.log(this.state.locations)
    return (
      <div className='pa4 bg-light-silver'>
      {this.state.success ? <Redirect to='/efforts' /> : null}
        <h1>{formState} Relief Effort Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField label='name'
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            {/* <label style={labelStyle}>Name</label>
            <input style={inputStyle}
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text" /> */}
          </div>
          <div>
            <label style={labelStyle}>Phase</label>
            <select style={inputStyle}
              onChange={this.handleChange('phase')}
              value={this.state.phase}
              type="text">
              <option value='choose'>Choose</option>
              <option value='planning'>Planning</option>
              <option value='in_process'>In Process</option>
              <option value='complete'>Complete</option>
            </select>
          </div>
          <div>
          <TextField label='organizationID'
            value={this.state.organizationID}
            onChange={this.handleChange('organizationID')}
          />
            {/* <label style={labelStyle}>Organization</label>
            <input style={inputStyle}
              onChange={this.handleChange('organizationID')}
              value={this.state.organizationID}
              type="text" /> */}
          </div>
          <div>
          {/* <TextField label='description'
            value={this.state.desc}
            onChange={this.handleChange('desc')}
          /> */}
            <label style={labelStyle}>Description</label>
            <textarea style={textInputStyle}
              onChange={this.handleChange('desc')}
              value={this.state.desc}
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
            <select
              value={this.state.location_id}
              onChange={this.handleChange('location_id')}>
              {/* <option>Location1</option>
              <option>Location2</option> */}
              {/* {this.state.locations.map(location => {
                return <option>{location}</option>
              })} */}
              {this.state.locations.map(location => {
                return <option value={location.id}>{location.name}</option>
              })}
            </select>
          </div>
          <div>
            <div>
                <button className='br2 bg-white pa2 mt2 mr2 fl'>Save</button>
              </div>
            <div className='br2 bg-white pa2 mt2 mr2 dib'>
              <Link to="/efforts">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = EffortForm
