import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import "./styles/selectteam.css"
function SelectTeam() {
    const [team, setTeam] = useState([]);
    const [search, setSearch] = useState('');
    function handleChange(e){
        setSearch(e.target.value);
    }
  return (
    <div className='select-team'>
        <div className='initials-search'><input type="text" value = {search} onChange={handleChange} spellcheck="false"/><Search size={35} color='#257adcff' /></div>
        <div className='initials-team'>
            {team.map((x, index)=>(
                <p key = {index}>Member {index + 1}: {x.fname} {x.lname}</p>
            ))}
        </div>
    </div>
  )
}

export default SelectTeam