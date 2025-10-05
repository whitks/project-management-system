import React, { useEffect, useState } from 'react'
import { Search, Plus, X, ArrowRight } from 'lucide-react'
import "./styles/selectteam.css"
function SelectTeam({setCurrPoint, team, setTeam}) {

  const [search, setSearch] = useState('');
  const [people, setPeople] = useState([]);
  const [showModal, setShowModal] = useState(false);
  function handleChange(e) {
    setSearch(e.target.value);
  }
  function showAllMembers() {
    setShowModal(true)
  }
  function handleClose() {
    setShowModal(false)
  }
  function handleRemoveMember(email){
    if( team.length === 0 ){
      return
    }
    setTeam( (prev)=>
    prev.filter(
      (ele)=>{
        return ele.email !== email; 
      }
    ))
  }
  function handleAddMember(k) {
    if(team.length === 3){
      alert("You cannot add more than 3")
      return
    }
    setTeam(prev => {
      const member = people[k];
      return [...prev, member];
    });

  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost/another/members.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      })
      const result = await response.json();
      setPeople(result.rows);
    };
    fetchData();
  }, [])
  function handleSubmit(){
    setCurrPoint(3)
  }
  return (
    <div className='select-team'>

      <div className='selectteam-content'>
        <h1>Add Team Members</h1>
        <div className='initials-search'><input type="text" value={search} onChange={handleChange} spellcheck="false" /><Search size={35} color='#257adcff' /></div>
        <button className='all-members' onClick={showAllMembers}> View all</button>
        <div className='initials-team'>
          {team.map((x, index) => (
            <div key={index} className="cartprod">
              <p>{index + 1}: </p>
              <p className='fname'>{x.firstname}</p>
              <p className='lname'>{x.lastname}</p>
              <p className='xemail'>{x.email}</p>
              <span className="remove" onClick={() => handleRemoveMember(x.email)}>
                <X />
              </span>

            </div>
          ))}
        </div></div>
      {showModal && <div class="modal-content">
        <div class="modal-header">
            <span class="close" onClick={handleClose}>&times;</span>
            <div className="modal-top">
          {team.map((x, index) => (
            <div key={index} className="modal-cart">
              <p className='fname' style={{color:"white"}}>{x.firstname} {x.lastname}</p>
              <span className="modal-remove" style={{display:"flex", justifyContent:"center", height:"18px", color:"white"}} onClick={() => handleRemoveMember(x.email)}>
                <X  size={18}/>
              </span>

            </div>
          ))}</div>

          <h2>Add your Team members:</h2>
        </div>
        <div class="modal-body">
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Shift</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {people.map((x, index) => (
                // <p> {index + 1}: {x.firstname} {x.lastname}</p>

                <tr key={x.email} className='modal-body-tr'>
                  <td>{index + 1}</td>
                  <td>{x.firstname} {x.lastname}</td>
                  <td>{x.email}</td>
                  <td>{x.shift}</td>
                  <td> <button className="add-teammate"  disabled={team.some(member => member.email === x.email)} style={{
  cursor: team.some(member => member.email === x.email) ? 'default' : 'pointer'
}} onClick={() => (handleAddMember(index))}><Plus /></button></td>
                </tr>
              ))}</tbody>
          </table>
        </div>
      </div>
      }
      {team.length >0&&<button className='all-members submit-btn' onClick={handleSubmit}>Proceed <ArrowRight/> </button>}
    </div>
  )
}

export default SelectTeam