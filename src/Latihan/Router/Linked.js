import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Linked() {
  return (
    <div>
      <div>
        <nav>
          <ul>
            <Link to="/" /* className="hai" */ style={{ margin: "50px" }} >Home</Link>
            <Link to="/about" style={{ marginRight: "50px" }}>About</Link>
            {/* pakai activeStyle untuk memberikan style pada link, bisanya pada navlink */}
            <NavLink to="/baru" activeStyle={{ backgroundColor: "red", color: "white" }}>Baru</NavLink>
            <Link to="/pagebaru" style={{ marginLeft: "50px" }}>Baru</Link>

          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Linked
