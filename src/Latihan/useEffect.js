import { BrowserRouter, Link, NavLink, Route, Switch, } from 'react-router-dom'
import Home from './pages'
import about from './pages/about'
import '../App.css';
import baru from './pages/baru';


function Effect() {

  return (
    <div>
      <BrowserRouter>


        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={about} path="/about" />
          <Route component={baru} path="/baru" />
          <Route component={() => {
            return <h1>404</h1>
          }} path="/*" />
          {/* kalau di setelah path, dikasih bintang maka path lain yang tidak ada akan muncul tulisan 404 */}



        </Switch>
      </BrowserRouter>


    </div >
  )
}

export default Effect
