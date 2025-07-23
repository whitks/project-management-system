import React from 'react'
import "./styles/navbar.css"
function NavBar() {
  return (
    <div className='nav'>
        <div className="navbar">
                    <div className="logo">
                        <h1>Connspace</h1>
                    </div>
                    <div className="right-nav">
                        <ul>
                        <li>Dashboard</li>
                        <li>Teams</li>
                        <li>Notifications</li>
                        <li className="profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></li>
                    </ul>
                    </div>
                </div>
    </div>
  )
}

export default NavBar