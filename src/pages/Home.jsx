import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaUserPlus, FaCalendarAlt, FaHotel, FaHandshake, FaDownload, FaUsers, FaBuilding, FaWater, FaHandHoldingHeart, FaGlobeAsia, FaNewspaper, FaBullhorn, FaArrowRight, FaPlayCircle, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'
import { useCountdown } from '../hooks/useCountdown'
import { useAnimateNumber } from '../hooks/useAnimateNumber'

const banners = ['/images/banner1.png', '/images/banner2.png', '/images/banner3.png']

const announcements = [
  { icon: FaNewspaper, date: 'March 15, 2026', title: 'Registration Now Open for AIWW 2027', excerpt: 'Early bird registration is now open for the 4th Asia International Water Week in Manila...', link: '/news' },
  { icon: FaBullhorn, date: 'March 10, 2026', title: 'Call for Thematic Sessions', excerpt: 'Submit your proposals for thematic sessions and side events for AIWW 2027...', link: '/participation' },
  { icon: FaHandshake, date: 'March 5, 2026', title: 'Sponsorship Opportunities Available', excerpt: 'Explore various sponsorship packages for the 4th Asia International Water Week...', link: '/exhibition' },
]

const quickLinks = [
  { icon: FaUserPlus, label: 'Register', to: '/register' },
  { icon: FaCalendarAlt, label: 'Program', to: '/program' },
  { icon: FaHotel, label: 'Venue & Hotel', to: '/venue' },
  { icon: FaHandshake, label: 'Sponsors', to: '/exhibition' },
  { icon: FaDownload, label: 'Downloads', to: '/downloads' },
]

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0)
  const countdown = useCountdown('2027-03-01T00:00:00')
  const attendees = useAnimateNumber(5842)
  const companies = useAnimateNumber(425)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Helmet>
        <title>AIWW 2027 | 4th Asia International Water Week - Manila, Philippines</title>
        <meta name="description" content="Official website of the 4th Asia International Water Week (AIWW) 2027, Manila, Philippines. Sustainable Water Solutions for a Resilient Asia." />
      </Helmet>

      {/* Sticky Logo Section */}
      <div className="sticky-logo-section">
        <div className="logo-container">
          <div className="sticky-logo">
            <img src="/images/aiww.png" alt="Asia International Water Week" />
          </div>
          <div className="logo-location">MANILA, PHILIPPINES IN 2027</div>
          <div className="logo-tagline">"Sustainable Water Solutions for a Resilient Asia"</div>
        </div>
      </div>

      {/* Hero Banner Slider */}
      <div className="hero-banner">
        <div className="slider-container">
          {banners.map((src, i) => (
            <div key={i} className={`slide${i === slideIndex ? ' active' : ''}`} style={{ backgroundImage: `url(${src})` }} />
          ))}
          <div className="slider-dots">
            {banners.map((_, i) => (
              <span key={i} className={`dot${i === slideIndex ? ' active' : ''}`} onClick={() => setSlideIndex(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/FdF4dNcSUwk?autoplay=1&mute=1&loop=1&playlist=FdF4dNcSUwk"
            title="MWSS Water Security: Legacy - Kaliwa Dam Project"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="video-loop-note">
          <FaPlayCircle style={{ marginRight: 6 }} /> MWSS Water Security: Legacy - Kaliwa Dam Project (highlight video loop)
        </div>
      </div>

      {/* Host/Co-host Logos */}
      <div className="host-logos-section">
        <h2 className="host-logos-title">Host & Co-organizers</h2>
        <div className="host-logos-container">
          {[
            { src: '/images/logo.png', alt: 'MWSS', label: 'MWSS' },
            { src: '/images/mwci.png', alt: 'MWCI', label: 'MWCI' },
            { src: '/images/mwsi.png', alt: 'MWSI', label: 'MWSI' },
            { src: '/images/awc.png', alt: 'Asia Water Council', label: 'Asia Water Council', className: 'awc-logo' },
          ].map(logo => (
            <div className="host-logo-item" key={logo.alt}>
              <img src={logo.src} alt={logo.alt} className={logo.className || ''} />
              <p>{logo.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links-section">
        <h2 className="quick-links-title">Quick Links</h2>
        <div className="quick-links-grid">
          {quickLinks.map(link => (
            <Link to={link.to} className="quick-link-card" key={link.label}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="countdown-section">
        <h2 className="countdown-title">Countdown to AIWW 2027</h2>
        <div className="countdown-container">
          {[
            { value: countdown.days, label: 'Days' },
            { value: countdown.hours, label: 'Hours' },
            { value: countdown.minutes, label: 'Minutes' },
            { value: countdown.seconds, label: 'Seconds' },
          ].map(item => (
            <div className="countdown-item" key={item.label}>
              <div className="countdown-number">{item.value}</div>
              <div className="countdown-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Introduction */}
      <div className="description-wrapper">
        <div className="event-description">
          The AIWW is a triennial water gathering for multi-stakeholders to seek tangible implementation for resolving Asian water problems. It is organized by the Asia Water Council in collaboration with the authorities of the host country. Regional water problems that were discussed for three years prior to the AIWW based on the preparatory process will be raised as the primary issues from Asian water community and will be disseminated to the global water community with action plans to solve them and timelines for them by the relevant committee at the AIWW. The tangible plans to implement solutions by each committee will be particularly highlighted by organizing the sessions on the pertinent topics. Designing the future plans for collected action plans will be the core part of the gathering in the AIWW. Members and prospective members of the AWC including water related stakeholders and preeminent experts are gathered in the AIWW and share their insights and experiences to support and develop the activities of the AWC so that it consequently contributes to pave the way towards sustainable development in Asia.
        </div>
      </div>

      {/* Statistics */}
      <div className="statistics-wrapper">
        <div className="statistics-section">
          <div className="stat-item" ref={attendees.ref}>
            <div className="stat-icon"><FaUsers /></div>
            <div className="stat-number">{attendees.value.toLocaleString()}</div>
            <div className="stat-label">Attendees</div>
          </div>
          <div className="stat-item" ref={companies.ref}>
            <div className="stat-icon"><FaBuilding /></div>
            <div className="stat-number">{companies.value.toLocaleString()}</div>
            <div className="stat-label">Participating Companies</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="icon-features">
        {[
          { icon: FaWater, label: 'Water Security' },
          { icon: FaHandHoldingHeart, label: 'Sustainable Solutions' },
          { icon: FaGlobeAsia, label: 'Asia Focus' },
          { icon: FaUsers, label: 'Multi-Stakeholder' },
        ].map(f => (
          <div className="feature-item" key={f.label}>
            <f.icon />
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      {/* Latest Announcements */}
      <div className="announcements-section">
        <h2 className="section-title">Latest Announcements</h2>
        <div className="news-grid">
          {announcements.map((item, i) => (
            <div className="news-card" key={i}>
              <div className="news-image">
                <item.icon />
              </div>
              <div className="news-content">
                <div className="news-date"><FaCalendarAlt /> {item.date}</div>
                <h3 className="news-title-card">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <Link to={item.link} className="news-link">Read More <FaArrowRight /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="social-section">
        <h2 className="section-title">Follow Us</h2>
        <div className="social-grid">
          {[
            { icon: FaFacebook, label: '@AIWW2027' },
            { icon: FaYoutube, label: 'AIWW Channel' },
            { icon: FaInstagram, label: '@aiww2027' },
          ].map(s => (
            <div className="social-item" key={s.label}>
              <s.icon className="social-icon-large" />
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
