const React = require('react')
const {Link} = require('react-router')
const xhr = require('xhr')

const Efforts = React.createClass({
  getInitialState: function() {
    return{
      efforts: []
    }
  },
  componentDidMount() {
    xhr.get('http://localhost:4000/efforts', {
      json: true
    }, (err, res, efforts) => {
      if (err) return console.log(err.message)
      this.setState({efforts})
    })
  },
  render() {
    const listEffort = effort =>
      <li key={effort.id}>
        <Link to={`/efforts/${effort.id}/show`}>
        {effort.name}
        </Link>
      </li>
    return(
      <div className='bg-light-silver'>
        <h1 className = 'black'>Relief Efforts</h1>
        <ul className='black'>
          {this.state.efforts.map(listEffort)}
        </ul>
        <div className='br2 bg-white pa2 mt2 mb2 mr2 dib fl'>
          <Link to="/efforts/new">New Relief Effort</Link>
        </div>
        <div className='br2 bg-white pa2 mt2 mb2 mr2 dib'>
          <Link to='/'>Home</Link>
        </div>
      </div>
    )
  }
})

module.exports = Efforts
