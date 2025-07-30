import "./styles/need.css"
import needimg from "../assets/4.svg"
function Need(props) {
  return (
    <div className="need mt-100">
        <div className="need-content" data-aos="fade-up">
        <h1>Simplifying Final-Year Project Management for Everyone</h1><p>
Every year, students, mentors, and admins face the same headache: scattered updates, unclear team structures, and endless approvals. That’s why we built this platform — a dedicated solution to manage final-year projects at our college. From team formation and mentor assignment to project tracking and streamlined approvals, everything is now in one place. No more confusion. Just collaboration, clarity, and progress.</p></div>
        <img src={needimg} alt="phone-img" data-aos="fade-up" />

</div>
  )
}

export default Need