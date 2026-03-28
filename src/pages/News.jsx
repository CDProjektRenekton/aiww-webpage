import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import { FaSearch, FaCalendarAlt, FaTag, FaNewspaper, FaBullhorn, FaHandshake, FaCalendarPlus } from 'react-icons/fa'

const allNews = [
  { id: 1, category: 'registration', icon: FaNewspaper, date: '2026-03-15', title: 'Registration Now Open for AIWW 2027', excerpt: 'Early bird registration is now open for the 4th Asia International Water Week. Take advantage of discounted rates by registering before January 31, 2027.', featured: true },
  { id: 2, category: 'program', icon: FaBullhorn, date: '2026-03-10', title: 'Call for Thematic Sessions', excerpt: 'Submit your proposals for thematic sessions and side events for AIWW 2027. We welcome innovative ideas across all water-related topics.', featured: true },
  { id: 3, category: 'sponsorship', icon: FaHandshake, date: '2026-03-05', title: 'Sponsorship Opportunities Available', excerpt: 'Explore various sponsorship packages for the 4th Asia International Water Week. Multiple tiers available from Bronze to Platinum.', featured: true },
  { id: 4, category: 'general', icon: FaCalendarPlus, date: '2026-02-28', title: 'AIWW 2027 Dates Confirmed', excerpt: 'The 4th Asia International Water Week will be held on March 1-5, 2027 at the Philippine International Convention Center in Manila.', featured: false },
  { id: 5, category: 'general', icon: FaNewspaper, date: '2026-02-15', title: 'National Organizing Committee Formed', excerpt: 'MWSS, MWCI, and MWSI have officially formed the National Organizing Committee for the 4th AIWW under the Asia Water Council.', featured: false },
  { id: 6, category: 'program', icon: FaBullhorn, date: '2026-02-01', title: 'Thematic Tracks Announced', excerpt: 'Six thematic tracks have been announced covering water security, climate adaptation, smart water management, governance, sanitation, and youth innovation.', featured: false },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'registration', label: 'Registration' },
  { id: 'program', label: 'Program' },
  { id: 'sponsorship', label: 'Sponsorship' },
]

export default function News() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = allNews.filter(item => {
    if (category !== 'all' && item.category !== category) return false
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.excerpt.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <>
      <PageHeader title="News & Announcements" subtitle="Stay updated with the latest AIWW 2027 news" />
      <div className="content-section">
        {/* Search */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input type="text" placeholder="Search announcements..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', border: '2px solid #cce7f5', borderRadius: 10, fontSize: '1rem' }} />
          </div>
        </div>

        <div className="filter-tabs">
          {categories.map(cat => (
            <button key={cat.id} className={`filter-tab${category === cat.id ? ' active' : ''}`} onClick={() => setCategory(cat.id)}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured */}
        {category === 'all' && !search && (
          <>
            <h2 style={{ color: '#003366', marginBottom: '1.5rem' }}>Featured</h2>
            <div className="news-grid" style={{ marginBottom: '3rem' }}>
              {allNews.filter(n => n.featured).map(item => (
                <div key={item.id} className="news-card">
                  <div className="news-image"><item.icon /></div>
                  <div className="news-content">
                    <div className="news-date"><FaCalendarAlt /> {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <h3 className="news-title-card">{item.title}</h3>
                    <p className="news-excerpt">{item.excerpt}</p>
                    <span style={{ display: 'inline-block', padding: '0.2rem 0.8rem', background: '#e3f2fd', borderRadius: 20, fontSize: '0.8rem', color: '#0066b3', fontWeight: 600 }}>
                      <FaTag style={{ marginRight: 4 }} /> {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* All articles */}
        <h2 style={{ color: '#003366', marginBottom: '1.5rem' }}>{category === 'all' && !search ? 'All Announcements' : `Results (${filtered.length})`}</h2>
        {filtered.length === 0 ? (
          <div className="content-card" style={{ textAlign: 'center', color: '#666' }}>
            <p>No announcements match your search criteria.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map(item => (
              <div key={item.id} className="session-card" style={{ borderLeftColor: '#0066b3' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ color: '#003366' }}>{item.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}><FaCalendarAlt style={{ marginRight: 4 }} /> {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <span style={{ padding: '0.2rem 0.8rem', background: '#e3f2fd', borderRadius: 20, fontSize: '0.8rem', color: '#0066b3', fontWeight: 600 }}>{item.category}</span>
                </div>
                <p style={{ color: '#555', lineHeight: 1.6, marginTop: '0.5rem' }}>{item.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
