import { useState } from 'react'
import Become from './components/Become'
import NavBar from './components/NavBar'
import SelectTeam from './components/SelectTeam'
import "./components/styles/initialpage.css"
// import { ProgressBar,Step } from 'react-step-progress-bar'
import "react-step-progress-bar/styles.css";
import SelectProject from './components/SelectProject'
function InitialPage() {
  const [currPoint, setCurrPoint] = useState(1)
  const [team, setTeam] = useState([]);
  return (
    <div>
              
      <div className="initials-container">
      {currPoint === 1&&
      <Become setCurrPoint = {setCurrPoint}/>}

      {currPoint === 2&&
      <SelectTeam setCurrPoint = {setCurrPoint} team={team} setTeam={setTeam}/>
      }
      {currPoint ===3&&
        <SelectProject/>
      }
      </div>
    </div>
  )
}

export default InitialPage