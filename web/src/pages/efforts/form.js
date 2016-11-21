const React = require('react')
const {Link, Redirect} = require('react-router')
const labelStyle = { display: 'block', color: 'red' }
const inputStyle = {display: 'block', color: 'gray', background: 'light-gray', width: '200px', height: '30px'}
const textInputStyle = {display: 'block', color: 'gray', background: 'light-gray', width: '200px', height: '120px'}
const xhr = require('xhr')

const EffortForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      phase: 'Planning',
      organizationID: '',
      desc: '',
      start: '',
      end: ''
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
    return (
      <div className='pa4 bg-light-silver'>
      {this.state.success ? <Redirect to='/efforts' /> : null}
        <h1>{formState} Relief Effort Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle}>Name</label>
            <input style={inputStyle}
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Phase</label>
            <select style={inputStyle}
              onChange={this.handleChange('phase')}
              value={this.state.phase}
              type="text">
              <option value='planning'>Planning</option>
              <option value='in_process'>In Process</option>
              <option value='complete'>Complete</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Organization</label>
            <input style={inputStyle}
              onChange={this.handleChange('organizationID')}
              value={this.state.organizationID}
              type="text" />
          </div>
          <div>
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
