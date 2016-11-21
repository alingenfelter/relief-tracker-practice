const React = require('react')
const { Link } = require('react-router')
const xhr = require('xhr')

const Effort = React.createClass({
  getInitialState() {
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
  render() {
    return (
      <div>
        <h3>Relief Effort Detail</h3>
        <h4>{this.state.effort.name}</h4>
        <p>Phase: {this.state.effort.phase}</p>
        <p>Organization: {this.state.effort.organizationID}</p>
        <p>Description: {this.state.effort.desc}</p>
        <p>Start Date: {this.state.effort.start}</p>
        <p>End Date: {this.state.effort.end}</p>
        <Link to='/efforts'>Return</Link>
      </div>
    )
  }
})

module.exports = Effort
