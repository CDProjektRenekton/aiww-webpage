import { Link } from 'react-router-dom'
import { FaFacebook, FaYoutube, FaInstagram, FaMap, FaWater, FaEnvelope, FaPhone, FaLocationDot, FaCopyright } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h3>
            <img src="/images/wlogo.png" alt="MWSS Logo" className="footer-logo" />
            MWSS
          </h3>
          <p style={{ fontSize: '1.3rem', fontWeight: 600 }}>4th Asia International Water Week</p>
          <p className="footer-tagline">"Sustainable Water Solutions for a Resilient Asia"</p>
          <div className="social-icons">
            <FaFacebook />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>
        <div className="footer-col">
          <h3><FaMap /> Pages</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/program">Program</Link>
          <Link to="/participation">Participation</Link>
          <Link to="/exhibition">Exhibition</Link>
          <Link to="/venue">Venue & Hotel</Link>
          <Link to="/travel">Travel Guide</Link>
          <Link to="/register">Register Now</Link>
        </div>
        <div className="footer-col">
          <h3><FaWater /> Contact</h3>
          <p><FaEnvelope style={{ marginRight: 6 }} /><span style={{ textTransform: 'lowercase' }}>aiww@mwss.gov.ph</span></p>
          <p><FaPhone style={{ marginRight: 6 }} /> (02) 8920-5521</p>
          <p><FaLocationDot style={{ marginRight: 6 }} /> MWSS Complex, 489 Katipunan Avenue, Balara, Quezon City, 1105</p>
        </div>
      </div>
      <div className="footer-bottom">
        <FaCopyright style={{ marginRight: 4 }} /> 2026 Metropolitan Waterworks and Sewerage System. All Rights Reserved.
      </div>
    </footer>
  )
}
