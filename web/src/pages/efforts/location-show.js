const React = require('react')

const LocationShow = React.createClass({
  getInitialState: function() {
      name: 'TODO location'
    }
  }
  componentDidMount() {
    this.props.get(this.props.id, (err, location) => {
      if (err) console.log(err.message)
      this.setState(location)
    })
  },
  render() {
    return (
      <p.this.state.name)</p>
    )
  }
})

module.exports = LocationShow
