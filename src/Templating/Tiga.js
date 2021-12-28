import React, { Component } from 'react'
import Templating from './Templating'

export default class Tiga extends Component {
  render() {
    return (
      <Templating {...this.props} >
        Tiga
      </Templating>
    )
  }
}
