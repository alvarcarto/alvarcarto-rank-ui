import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = (props) => <div className="NavBar">
  <img src="public/" alt="Sifty" />
  <Link to="/new-poll">Create new poll</Link>
</div>

export default NavBar;
