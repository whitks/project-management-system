import React, { useEffect, useState } from 'react'
import { Search, Eye } from 'lucide-react'
import "./styles/selectteam.css"
function SelectTeam() {
    const [team, setTeam] = useState([]);
    const [search, setSearch] = useState('');
    const [people, setPeople] = useState([])
    function handleChange(e){
        setSearch(e.target.value);
    }
    function showAllMembers(){
        console.log(people);
    }
    useEffect(()=>{
        const fetchData = async ()=>{
        const response = await fetch("http://localhost/another/members.php", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        credentials: 'include'
      })
      const result = await response.json();
      console.log(result);
      setPeople(result.rows);
    };
    fetchData();
    }, [])
  return (
    <div className='select-team'>
        <div className='all-members' onClick={showAllMembers}>
        <Eye /></div>
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