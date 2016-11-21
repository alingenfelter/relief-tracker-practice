const React = require('react')
const xhr = require('xhr')
const { Link, Redirect} = require('react-router')


const Effort = React.createClass({
  getInitialState: function() {
    return {
      effort: {}
    }
  },
  componentDidMount() {
    xhr.get('http://localhost:4000/efforts/' +
      this.props.params.id, {
        json: true
      }, (err, response, effort) => {
        if (err) return console.log(err.message)
        this.setState({effort})
      }
    )
  },
  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure?') ) {
      xhr.del('http://localhost:4000/efforts/' + this.state.effort.id, {
        json: this.state.effort
      }, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({removed: true})
      })
    }
  },
  render() {
    return (
      <div className='pa4 bg-light-silver '>
        { this.state.removed ? <Redirect to='/efforts' /> : null}
        <h3>Relief Effort Details for {this.state.effort.name}</h3>
        <div className='ba bw1 bg-light-gray b--silver br2 pa2'>
          <p>Phase: {this.state.effort.phase}</p>
          <p>Organization: {this.state.effort.organizationID}</p>
          <p>Description: {this.state.effort.desc}</p>
          <p>Start Date: {this.state.effort.start}</p>
          <p>End Date: {this.state.effort.end}</p>
        </div>
        <div className='br2 bg-white pa2 mt2 mr2 dib fl '>
          <Link to={`/efforts/${this.state.effort.id}/edit`}>Edit Relief Effort</Link>
        </div>
        <div>
          <button className='br2 bg-white pa2 mt2 mr2 fl' onClick={this.handleRemove}>Remove</button>
        </div>
        <div className='br2 bg-white pa2 mt2 mr2 dib'>
          <Link to='/efforts'>Return</Link>
        </div>
      </div>

    )
  }
})

module.exports = Effort
