import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import "./styles/selectteam.css"
function SelectTeam() {
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState([]);
  const [showModal, setShowModal] = useState(false)
  function handleChange(e) {
    setSearch(e.target.value);
  }
  function showAllMembers() {
    setShowModal(true)
  }
  function handleClose() {
    setShowModal(false)
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost/another/members.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      <div className='selectteam-content'>
        <div className='initials-search'><input type="text" value={search} onChange={handleChange} spellcheck="false" /><Search size={35} color='#257adcff' /></div>
        <button className='all-members' onClick={showAllMembers}> View all</button>
        <div className='initials-team'>
          {team.map((x, index) => (
            <p key={index}>Member {index + 1}: {x.firstname} {x.lastname}</p>
          ))}
        </div></div>
      {showModal && <div class="modal-content">
        <div class="modal-header">
          <span class="close" onClick={handleClose}>&times;</span>
          <h2>Add your Team members:</h2>
        </div>
        <div class="modal-body">
          <table>
            <tr>
              <th>Sr.no</th>
              <th></th>
              <th>Sr.no</th>
            </tr>
            {people.map((x, index) => (
              // <p> {index + 1}: {x.firstname} {x.lastname}</p>

              <tr key={index} className='modal-body-tr'>
                <td>{index + 1}</td>
                <td>{x.firstname}</td>
                <td>{x.lastname}</td>
                <td>{x.email}</td>
                <td>{x.shift}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      }
    </div>
  )
}

export default SelectTeam