import "./styles/footer.css"

function Footer() {
  return (
    <div><footer className="footer mt-5">
  <div className="container">
    <div className="row text-center text-md-start">
      <div className="col-md-4 mb-3">
        <h5>About Us</h5>
        <p>we help to college student to select the project.</p>
      </div>
      <div className="col-md-4 mb-3 footer-links">
        <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#" />
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
      </div>
      <div className="col-md-4 mb-3">
        <h5>Contact</h5>
        <p>Email: skitjaipur@ac.in</p>
        <p>Phone: +91-3468748957</p>
      </div>
    </div>
    <div className="text-center mt-3">
      <small>© 2025 skit jaipur. All rights reserved.</small>
    </div>
  </div>
</footer>

</div>
  )
}

export default Footer