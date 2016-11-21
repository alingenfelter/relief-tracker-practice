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
      <div>
        { this.state.removed ? <Redirect to='/efforts' /> : null}
        <h3>Relief Effort Detail</h3>
        <h4>{this.state.effort.name}</h4>
        <p>Phase: {this.state.effort.phase}</p>
        <p>Organization: {this.state.effort.organizationID}</p>
        <p>Description: {this.state.effort.desc}</p>
        <p>Start Date: {this.state.effort.start}</p>
        <p>End Date: {this.state.effort.end}</p>
        <Link to={`/efforts/${this.state.effort.id}/edit`}>Edit Relief Effort</Link>
        <button onClick={this.handleRemove}>Remove</button>
        <Link to='/efforts'>Return</Link>
      </div>

    )
  }
})

module.exports = Effort
