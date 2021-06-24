import React from 'react'

class Example extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        count: 0
      }
    }
  
    add3 () {
      const add = state => ({ count: state.count + 1 })
    //   const add = { count: this.state.count + 1 }
      this.setState(add)
      this.setState(add)
      // setState() is still async, you get 0 here
      console.log(this.state.count)
      this.setState(add)
    }
  
    render() {
      console.log('render')
      return (
        <button onClick={this.add3.bind(this)}>
          count: {this.state.count}
        </button>
      )
    }
  }
  
export default Example;