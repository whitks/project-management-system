import React, { useEffect, useState } from 'react'
import { Search, Plus, X, ArrowRight } from 'lucide-react'
import "./styles/selectteam.css"

function SelectMentor({ setCurrPoint, mentor, setMentor }) {

  const [search, setSearch] = useState('');
  const [mentors, setMentors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null)
  function handleChange(e) {
    setSearch(e.target.value);
  }

  function showAllMentors() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  function handleSelectMentor(k) {
    setSelectedMentor(mentors[k]);
    setShowModal(false);
  }

  function handleRemoveMentor() {
    setSelectedMentor(null);
  }

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost/another/mentors.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });
        const result = await response.json();
        if (result.status === "success") {
          setMentors(result.rows);
        }
      } catch (err) {
        console.error("Error fetching mentors", err);
      }
    };
    fetchMentors();
  }, []);

  function handleSubmit() {
    setMentor(selectedMentor);
    setCurrPoint(5);
  }

  return (
    <div className="select-team">

      <div className="selectteam-content">
        <h1>Select a Mentor</h1>
        <div className="initials-search">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            spellCheck="false"
            placeholder="Search mentors..."
          />
          <Search size={35} color='#257adcff' />
        </div>
        <button className="all-members" onClick={showAllMentors}> View all</button>

        {selectedMentor && (
          <div className="cartprod">
            <p className="fname">{selectedMentor.firstname}</p>
            <p className="lname">{selectedMentor.lastname}</p>
            <p className="xemail">{selectedMentor.email}</p>
            <span className="remove" onClick={handleRemoveMentor}>
              <X />
            </span>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={handleClose}>&times;</span>

            {selectedMentor && (
              <div className="modal-top">
                <div className="modal-cart">
                  <p className='fname'>{selectedMentor.firstname} {selectedMentor.lastname}</p>
                  <span className="modal-remove" style={{ display: "flex", justifyContent: "center", height: "18px" }} onClick={handleRemoveMentor}>
                    <X size={18} />
                  </span>
                </div>
              </div>
            )}

            <h2>Choose your Mentor:</h2>
          </div>

          <div className="modal-body">
            <table>
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Add</th>
                </tr>
              </thead>
              <tbody>
                {mentors
                  .filter(m => 
                    m.firstname.toLowerCase().includes(search.toLowerCase()) ||
                    m.lastname.toLowerCase().includes(search.toLowerCase()) ||
                    m.email.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((x, index) => (
                    <tr key={x.mentor_id} className="modal-body-tr">
                      <td>{index + 1}</td>
                      <td>{x.firstname} {x.lastname}</td>
                      <td>{x.email}</td>
                      <td>
                        <button
                          className="add-teammate"
                          disabled={selectedMentor && selectedMentor.mentor_id === x.mentor_id}
                          style={{
                            cursor: selectedMentor && selectedMentor.mentor_id === x.mentor_id ? 'default' : 'pointer'
                          }}
                          onClick={() => handleSelectMentor(index)}
                        >
                          <Plus />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedMentor && (
        <button className="all-members submit-btn" onClick={handleSubmit}>
          Proceed <ArrowRight />
        </button>
      )}
    </div>
  )
}

export default SelectMentor
