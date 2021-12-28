import React, { Component } from "react";
import { BrowserRouter, Link, NavLink, Route, Switch, } from 'react-router-dom'
import Dua from "./Dua";
import Satu from "./Satu";
import Tiga from "./Tiga";

export default class Routing extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route component={Satu} path="/" exact />
            <Route component={Dua} path="/dua" />
            <Route component={Tiga} path="/tiga" />
            <Route
              component={() => {
                return <h1>404</h1>;
              }}
              path="/*"
            />
            {/* kalau di setelah path, dikasih bintang maka path lain yang tidak ada akan muncul tulisan 404 */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
