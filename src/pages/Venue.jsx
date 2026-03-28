import PageHeader from '../components/common/PageHeader'
import { FaMapMarkerAlt, FaWifi, FaParking, FaWheelchair, FaUtensils, FaStar, FaExternalLinkAlt } from 'react-icons/fa'

const hotels = [
  { name: 'Sofitel Philippine Plaza Manila', stars: 5, rate: 'From PHP 8,500/night', distance: '0.3 km from PICC', note: 'Official hotel partner - Special AIWW rates available' },
  { name: 'Conrad Manila', stars: 5, rate: 'From PHP 9,000/night', distance: '0.5 km from PICC', note: 'Bay area luxury hotel' },
  { name: 'New World Makati Hotel', stars: 5, rate: 'From PHP 7,500/night', distance: '4 km from PICC', note: 'Makati CBD location' },
  { name: 'Microtel by Wyndham Mall of Asia', stars: 3, rate: 'From PHP 3,500/night', distance: '1.5 km from PICC', note: 'Budget-friendly option' },
  { name: 'Red Planet Manila Bay', stars: 3, rate: 'From PHP 2,800/night', distance: '2 km from PICC', note: 'Budget-friendly option' },
]

export default function Venue() {
  return (
    <>
      <PageHeader title="Venue & Hotel" subtitle="Philippine International Convention Center (PICC), Manila" />
      <div className="content-section">
        <div className="content-card">
          <h2><FaMapMarkerAlt style={{ marginRight: 8, color: '#0066b3' }} /> Venue Details</h2>
          <p><strong>Philippine International Convention Center (PICC)</strong></p>
          <p>CCP Complex, Roxas Boulevard, Pasay City, Metro Manila, Philippines 1307</p>
          <p style={{ marginTop: '1rem' }}>The PICC is the premier convention center of the Philippines, located along Manila Bay. It offers world-class facilities for international conferences and exhibitions.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              { icon: FaWifi, label: 'High-Speed Wi-Fi' },
              { icon: FaParking, label: 'Parking Available' },
              { icon: FaWheelchair, label: 'Accessible' },
              { icon: FaUtensils, label: 'Dining Options' },
            ].map(f => (
              <div key={f.label} style={{ textAlign: 'center', padding: '1rem', background: '#f0f9ff', borderRadius: 12 }}>
                <f.icon style={{ fontSize: '1.5rem', color: '#0066b3', marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }} />
                <span style={{ fontWeight: 600, color: '#003366', fontSize: '0.9rem' }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Map */}
        <div className="content-card">
          <h2>Interactive Map</h2>
          <div className="venue-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.8024021983387!2d120.97853531535!3d14.554729789825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cbf0bce5c74d%3A0x53737e0e21960247!2sPhilippine+International+Convention+Center!5e0!3m2!1sen!2sph!4v1"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PICC Location Map"
            />
          </div>
        </div>

        {/* Hotels */}
        <div className="content-card">
          <h2>Accommodation</h2>
          <p>The following hotels are recommended for AIWW 2027 participants. Special rates may be available - check back closer to the event for booking codes.</p>
          <div className="hotel-grid" style={{ marginTop: '1.5rem' }}>
            {hotels.map(hotel => (
              <div key={hotel.name} className="hotel-card">
                <h3>{hotel.name}</h3>
                <div style={{ display: 'flex', gap: 2, marginBottom: '0.5rem' }}>
                  {Array.from({ length: hotel.stars }).map((_, i) => <FaStar key={i} style={{ color: '#FFD700', fontSize: '0.9rem' }} />)}
                </div>
                <div className="hotel-rate">{hotel.rate}</div>
                <div className="hotel-distance"><FaMapMarkerAlt style={{ marginRight: 4 }} /> {hotel.distance}</div>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>{hotel.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
