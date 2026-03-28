import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import { FaUsers, FaBuilding, FaGlobe, FaHistory, FaChevronRight } from 'react-icons/fa'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'committees', label: 'Organizing Committees' },
  { id: 'mwss', label: 'MWSS' },
  { id: 'mwci', label: 'MWCI' },
  { id: 'mwsi', label: 'MWSI' },
  { id: 'past', label: 'Past AIWW' },
]

export default function About() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <>
      <PageHeader title="About AIWW" subtitle="Learn about the 4th Asia International Water Week" />
      <div className="content-section">
        <div className="filter-tabs">
          {tabs.map(tab => (
            <button key={tab.id} className={`filter-tab${activeTab === tab.id ? ' active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="content-card">
              <h2>Welcome to the 4th AIWW</h2>
              <p>The Asia International Water Week (AIWW) is a triennial, multi-stakeholder water gathering convened under the Asia Water Council and the host country, designed to surface implementable solutions to Asia's water challenges.</p>
              <p>As Host Country for the 4th AIWW (Manila, Philippines, 2027), the National Organizing Committee is proud to welcome water professionals, policymakers, researchers, and stakeholders from across Asia and beyond.</p>
            </div>
            <div className="content-card">
              <h2>Event Overview</h2>
              <p><strong>Theme:</strong> "Sustainable Water Solutions for a Resilient Asia"</p>
              <p><strong>Dates:</strong> March 1-5, 2027</p>
              <p><strong>Venue:</strong> Philippine International Convention Center (PICC), Manila, Philippines</p>
              <p><strong>Expected Participants:</strong> 5,000+ delegates from 40+ countries</p>
              <h3 style={{ marginTop: '1.5rem' }}>Objectives</h3>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#333' }}>
                <li>Share insights and best practices on Asia's water challenges</li>
                <li>Develop actionable solutions through collaborative sessions</li>
                <li>Prepare the Asia region's contributions to the World Water Forum</li>
                <li>Foster partnerships across government, private sector, and civil society</li>
                <li>Highlight youth and innovation in the water sector</li>
              </ul>
            </div>
          </>
        )}

        {activeTab === 'committees' && (
          <>
            <div className="content-card">
              <h2><FaUsers style={{ marginRight: 8 }} /> Governing Body</h2>
              <p>The 4th AIWW is jointly organized under the leadership of the Asia Water Council (AWC) and the National Organizing Committee (NOC) of the Philippines.</p>
            </div>
            <div className="content-card">
              <h2>National Organizing Committee</h2>
              <p>The NOC is composed of the following organizations:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                {[
                  { name: 'MWSS', full: 'Metropolitan Waterworks and Sewerage System', role: 'Lead Organizer', logo: '/images/logo.png' },
                  { name: 'MWCI', full: 'Manila Water Company, Inc.', role: 'Co-organizer', logo: '/images/mwci.png' },
                  { name: 'MWSI', full: 'Maynilad Water Services, Inc.', role: 'Co-organizer', logo: '/images/mwsi.png' },
                ].map(org => (
                  <div key={org.name} style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid #e0f2fe', borderRadius: 15 }}>
                    <img src={org.logo} alt={org.name} style={{ height: 60, marginBottom: '0.8rem' }} />
                    <h3>{org.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>{org.full}</p>
                    <p style={{ color: '#0066b3', fontWeight: 600 }}>{org.role}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="content-card">
              <h2>Co-organizers & Partners</h2>
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <img src="/images/awc.png" alt="Asia Water Council" style={{ height: 60, marginBottom: '0.8rem' }} />
                <h3>Asia Water Council</h3>
                <p>The AWC serves as the umbrella organization for the AIWW series, providing strategic direction and international coordination.</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'mwss' && (
          <div className="content-card">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img src="/images/logo.png" alt="MWSS" style={{ height: 80 }} />
            </div>
            <h2>Metropolitan Waterworks and Sewerage System (MWSS)</h2>
            <p>The Metropolitan Waterworks and Sewerage System (MWSS) is a government-owned and controlled corporation responsible for providing water supply and sewerage services to the Metro Manila area and parts of Rizal and Cavite provinces.</p>
            <p>MWSS serves as the lead organizer of the 4th AIWW, leveraging its extensive experience in water management and infrastructure development in the Philippines.</p>
            <h3>Key Functions</h3>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#333' }}>
              <li>Policy and regulatory oversight of water concessionaires</li>
              <li>Water supply infrastructure planning and development</li>
              <li>Watershed management and dam operations</li>
              <li>Ensuring water security for Metro Manila and surrounding areas</li>
            </ul>
            <div style={{ marginTop: '1rem' }}>
              <a href="https://www.mwss.gov.ph" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                Visit MWSS Website <FaChevronRight />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'mwci' && (
          <div className="content-card">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img src="/images/mwci.png" alt="MWCI" style={{ height: 80 }} />
            </div>
            <h2>Manila Water Company, Inc. (MWCI)</h2>
            <p>Manila Water Company, Inc. is the water and wastewater services provider for the East Zone of Metro Manila, covering parts of Makati, Mandaluyong, Pasig, Pateros, San Juan, Taguig, Marikina, Antipolo, and other areas in Rizal province.</p>
            <p>As a co-organizer of the 4th AIWW, Manila Water brings its expertise in innovative water treatment and distribution technologies.</p>
            <h3>Areas of Expertise</h3>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#333' }}>
              <li>Water distribution and non-revenue water reduction</li>
              <li>Wastewater treatment and used water management</li>
              <li>Community-based water supply programs</li>
              <li>Smart water network management</li>
            </ul>
            <div style={{ marginTop: '1rem' }}>
              <a href="https://www.manilawater.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                Visit Manila Water Website <FaChevronRight />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'mwsi' && (
          <div className="content-card">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img src="/images/mwsi.png" alt="MWSI" style={{ height: 80 }} />
            </div>
            <h2>Maynilad Water Services, Inc. (MWSI)</h2>
            <p>Maynilad Water Services, Inc. is the largest private water concessionaire in the Philippines, serving the West Zone of Metro Manila, including the cities of Manila, Quezon City, Caloocan, Pasay, Paranaque, Las Pinas, Muntinlupa, Valenzuela, Navotas, Malabon, and parts of Cavite province.</p>
            <p>As a co-organizer, Maynilad contributes its extensive experience in large-scale water infrastructure management.</p>
            <h3>Areas of Expertise</h3>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#333' }}>
              <li>Large-scale water treatment and distribution</li>
              <li>Sewerage and sanitation systems</li>
              <li>Water infrastructure modernization</li>
              <li>Disaster resilience and business continuity</li>
            </ul>
            <div style={{ marginTop: '1rem' }}>
              <a href="https://www.mayniladwater.com.ph" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                Visit Maynilad Website <FaChevronRight />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'past' && (
          <div className="content-card">
            <h2><FaHistory style={{ marginRight: 8 }} /> Past AIWW Events</h2>
            <p>The Asia International Water Week has been held three times prior to the 4th edition in Manila:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
              {[
                { edition: '1st AIWW', year: '2018', location: 'Gyeongju, South Korea', theme: 'Water Cooperation for a Sustainable Future', desc: 'The inaugural AIWW established the framework for regional water cooperation and set priorities for addressing key water challenges in Asia.' },
                { edition: '2nd AIWW', year: '2021', location: 'Online (Virtual)', theme: 'Water for Resilient and Sustainable Cities', desc: 'The 2nd AIWW was held virtually due to the global pandemic, focusing on urban water resilience and the impact of COVID-19 on water services.' },
                { edition: '3rd AIWW', year: '2024', location: 'Bali, Indonesia', theme: 'Accelerating Action on Water and Sanitation', desc: 'The 3rd AIWW brought together stakeholders to accelerate implementation of water and sanitation solutions ahead of the 10th World Water Forum.' },
              ].map(event => (
                <div key={event.edition} style={{ padding: '1.5rem', background: '#f0f9ff', borderRadius: 12, borderLeft: '4px solid #0066b3' }}>
                  <h3>{event.edition} ({event.year})</h3>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Theme:</strong> {event.theme}</p>
                  <p style={{ marginTop: '0.5rem' }}>{event.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
