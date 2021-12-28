import React, { Component } from 'react'
import Templating from './Templating'


export default class Dua extends Component {
  render() {
    return (
      <Templating {...this.props} >
        Dua
      </Templating>
    )
  }
}
