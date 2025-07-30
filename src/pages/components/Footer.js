import "./styles/footer.css"

function Footer() {
  return (
    <>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-section">
                <h5>About Us</h5>
                <p>We help college students to select the project.</p>
            </div>
            <div class="footer-section">
                <h5>Quick Links</h5>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h5>Contact</h5>
                <p>Email: skitjaipur@ac.in</p>
                <p>Phone: +91-3468748957</p>
            </div>
        </div>
        <div class="footer-bottom">
            <small>&copy; 2025 SKIT Jaipur. All rights reserved.</small>
        </div>
    </footer>
    </>
  )
}

export default Footer