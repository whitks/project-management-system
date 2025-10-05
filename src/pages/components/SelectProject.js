import { useState, useEffect } from 'react'
import "./styles/selectproject.css"
import { Search,ArrowRight, X} from "lucide-react"
function SelectProject({setCurrPoint, setProject} ) {
  const [search, setSearch] = useState("")
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null);
  function handleChange(e) {
    setSearch(e.target.value);
  }
  function handleClose() {
    setShowModal(false)
  }


  function handleSelectProject(project) {
    setSelectedProject(project);
    setShowModal(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://prback.ct.ws/another/availableprojects.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      })
      const result = await response.json();
      setProjects(result.rows);
    };
    fetchData();
  }, [])
  async function showAllProjects() {
    setShowModal(true);
    // If you want to always fetch fresh data:
    const response = await fetch("https://prback.ct.ws/another/availableprojects.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    });
    const result = await response.json();
    setProjects(result.rows || []);
  }
  function handleSubmit(){
    setProject(selectedProject);
    setCurrPoint(4);
  }
  return (
    <div className='selectproject'>
      <div className="selectproject-content">
      <h1>Select Project</h1>
      <div className='initials-search'><input type="text" value={search} onChange={handleChange} spellcheck="false" /><Search size={35} color='#257adcff' /></div>
      <button className='all-members' onClick={showAllProjects}> View all</button>
      <div className="selected">
{selectedProject && (
  <div className='initials-team'>
    <div className="cartprod">
      <p className='fname'>{selectedProject.id}</p>
      <p className='lname'>{selectedProject.project_name}</p>
    </div>
  </div>
)}
      </div>
      {showModal && <div class="modal-content">
        <div class="modal-header">
          <span class="close" onClick={handleClose}>&times;</span>
          <div className="modal-top">
            <h2>Select your project</h2>
          </div>
        </div>
        <div class="modal-body">
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Project_ID</th>
                <th>Project Name</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((x, index) => (
                <tr key={x.id} className='modal-body-tr' onClick={() => handleSelectProject(x)}>
                  <td>{index + 1}</td>
                  <td>{x.id}</td>
                  <td>{x.project_name}</td>
                </tr>
              ))}</tbody>
          </table>
        </div>
        
      </div>
      
      }
      
      {selectedProject&&<button className='all-members submit-btn' onClick={handleSubmit}>Proceed <ArrowRight/> </button>}
      </div>
    </div>
  )
}

export default SelectProject