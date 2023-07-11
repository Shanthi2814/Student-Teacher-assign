import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';
function Navbar() {
  return <>
  <nav >
    <div> <h3>Students & Teachers Management</h3> </div>
    <div >
   <Link to = "create-student" style={{textDecoration: 'none'}}><span>Create student</span></Link>
    <Link to = "create-teacher" style={{textDecoration: 'none'}}><span>Create teacher</span></Link>
    <Link to = "assign-teacher"style={{textDecoration: 'none'}} ><span>Assign teacher</span></Link>
    <Link to = "change-teacher" style={{textDecoration: 'none'}}><span>Change teacher</span></Link>
    

    
    </div>
   <div><Link to = "/" style={{textDecoration: 'none'}}><span> Dashboard</span></Link></div>
  </nav>
  </>
}

export default Navbar
