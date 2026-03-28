import PageHeader from '../components/common/PageHeader'
import { FaPlane, FaPassport, FaBus, FaShieldAlt, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa'

const faqs = [
  { q: 'Do I need a visa to enter the Philippines?', a: 'Many nationalities are granted visa-free entry for 30 days. Check with your nearest Philippine embassy or consulate for specific requirements based on your nationality.' },
  { q: 'What is the currency in the Philippines?', a: 'The Philippine Peso (PHP). Major credit cards are widely accepted. ATMs are available throughout Metro Manila.' },
  { q: 'What is the weather like in March?', a: 'March is part of the dry season in Manila. Expect warm weather with temperatures around 28-34°C (82-93°F). Light clothing is recommended.' },
  { q: 'Is tap water safe to drink?', a: 'It is recommended to drink bottled or purified water. Hotels and the venue will provide safe drinking water.' },
  { q: 'What electrical plug type is used?', a: 'The Philippines uses Type A and Type B plugs (flat two-pin and three-pin). Voltage is 220V, 60Hz.' },
]

export default function Travel() {
  return (
    <>
      <PageHeader title="Travel Guide" subtitle="Essential travel information for visiting Manila, Philippines" />
      <div className="content-section">
        <div className="content-card">
          <h2><FaPlane style={{ marginRight: 8, color: '#0066b3' }} /> Getting to Manila</h2>
          <p><strong>Ninoy Aquino International Airport (NAIA/MNL)</strong> is the main gateway to Metro Manila, served by major international and domestic airlines.</p>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
            <li><strong>From Airport to PICC:</strong> Approximately 30-45 minutes by taxi or ride-hailing (Grab)</li>
            <li><strong>Airport Terminals:</strong> NAIA has 4 terminals. Check your airline's terminal assignment.</li>
            <li><strong>Ride-hailing:</strong> Grab is the most popular ride-hailing app in the Philippines</li>
            <li><strong>Airport Taxi:</strong> Use only official yellow metered taxis or Grab from the airport</li>
          </ul>
        </div>

        <div className="content-card">
          <h2><FaPassport style={{ marginRight: 8, color: '#0066b3' }} /> Visa Information</h2>
          <p>The Philippines offers visa-free entry to nationals of over 150 countries for stays of up to 30 days. For those requiring a visa:</p>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
            <li>Apply at the nearest Philippine Embassy or Consulate</li>
            <li>Processing time: typically 5-10 business days</li>
            <li>Required documents: valid passport, completed application form, passport photos, proof of accommodation, return ticket</li>
            <li>For AIWW delegates, an invitation letter can be provided upon registration</li>
          </ul>
        </div>

        <div className="content-card">
          <h2><FaBus style={{ marginRight: 8, color: '#0066b3' }} /> Local Transportation</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
            <li><strong>Grab (Ride-hailing):</strong> Recommended for convenience and safety. Available 24/7.</li>
            <li><strong>Taxi:</strong> Metered taxis are available. Insist on meter use. White taxis are standard; yellow are premium.</li>
            <li><strong>MRT/LRT:</strong> Rail transit for longer distances. Taft Avenue station is closest to PICC area.</li>
            <li><strong>Jeepney:</strong> Iconic Philippine public transport. Affordable but may be confusing for first-time visitors.</li>
            <li><strong>Hotel Shuttle:</strong> Many hotels near PICC offer shuttle services.</li>
          </ul>
        </div>

        <div className="content-card">
          <h2><FaShieldAlt style={{ marginRight: 8, color: '#0066b3' }} /> Safety Advisories</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
            <li>Manila is generally safe for tourists but exercise normal precautions</li>
            <li>Keep valuables secure and be aware of your surroundings</li>
            <li>Use official transportation services (Grab, hotel shuttles, metered taxis)</li>
            <li>Emergency hotline: 911 (nationwide) or 117 (local police)</li>
            <li>Tourist assistance: Department of Tourism hotline 1-800-8888-DOT (368)</li>
          </ul>
        </div>

        <div className="content-card">
          <h2><FaQuestionCircle style={{ marginRight: 8, color: '#0066b3' }} /> Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ padding: '1rem 1.5rem', background: '#f0f9ff', borderRadius: 12, borderLeft: '3px solid #0066b3' }}>
                <h4 style={{ color: '#003366', marginBottom: '0.5rem' }}>{faq.q}</h4>
                <p style={{ color: '#555', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
