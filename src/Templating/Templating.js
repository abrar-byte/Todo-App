import React, { Component } from 'react'
import { BrowserRouter, Link, NavLink, Route, Switch, } from 'react-router-dom'


export default class Templating extends Component {
  render() {
    console.log(this.props.children)
    return (
      <div>
        <div>
          Navbar Dummy
        </div>
        <Link to="/"><div>1</div></Link>
        <Link to="/dua"><div>2</div></Link>
        <Link to="/tiga"><div>3</div></Link>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
