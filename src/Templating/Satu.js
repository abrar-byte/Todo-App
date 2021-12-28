import React, { Component } from 'react'
import Templating from './Templating'

export default class Satu extends Component {
  state={
    x:10
  }
  masuk=()=>{
    let {x}=this.state
    x += 10
    
    this.setState({x})
  }
  render() {
   let y=this.state.x-1
    return (
      <Templating {...this.props} >
        <div>Satu</div>
        <div>{y}</div>
        <button onClick={this.masuk}>Button</button>

      </Templating>
    )
  }
}
