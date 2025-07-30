import { useState } from 'react'
import Become from './components/Become'
import NavBar from './components/NavBar'
import SelectTeam from './components/SelectTeam'
import "./components/styles/initialpage.css"
function InitialPage() {
  const [currPoint, setCurrPoint] = useState(1)
  return (
    <div>
      <NavBar back = {"black"} colo = {"white"}/>
      <div className="initials-container">
      {currPoint == 1&&
      <Become setCurrPoint = {setCurrPoint}/>}

      {currPoint == 2&&
      <SelectTeam/>
      }
      </div>
    </div>
  )
}

export default InitialPage