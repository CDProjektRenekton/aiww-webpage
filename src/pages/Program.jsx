import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import { PROGRAM_DAYS, THEMATIC_TRACKS, SESSIONS, SPEAKERS } from '../data/programData'
import { FaClock, FaMapMarkerAlt, FaUser, FaFilter, FaTicketAlt } from 'react-icons/fa'
import { formatCurrency } from '../utils/helpers'

export default function Program() {
  const [activeDay, setActiveDay] = useState('all')
  const [activeTrack, setActiveTrack] = useState('all')
  const [activeType, setActiveType] = useState('all')
  const [showSpeakers, setShowSpeakers] = useState(false)

  const types = [
    { id: 'all', label: 'All' },
    { id: 'plenary', label: 'Plenary' },
    { id: 'thematic', label: 'Thematic' },
    { id: 'side-event', label: 'Side Events' },
    { id: 'special', label: 'Special Forums' },
    { id: 'field-trip', label: 'Field Trips' },
  ]

  const filtered = SESSIONS.filter(s => {
    if (activeDay !== 'all' && s.day !== activeDay) return false
    if (activeTrack !== 'all' && s.track !== activeTrack) return false
    if (activeType !== 'all' && s.type !== activeType) return false
    return true
  })

  const getSpeaker = (id) => SPEAKERS.find(sp => sp.id === id)
  const getTrack = (id) => THEMATIC_TRACKS.find(t => t.id === id)

  return (
    <>
      <PageHeader title="Program" subtitle="Explore the 4th AIWW program schedule, sessions, and speakers" />
      <div className="content-section">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className={`filter-tab${!showSpeakers ? ' active' : ''}`} onClick={() => setShowSpeakers(false)}>
            <FaFilter style={{ marginRight: 4 }} /> Schedule
          </button>
          <button className={`filter-tab${showSpeakers ? ' active' : ''}`} onClick={() => setShowSpeakers(true)}>
            <FaUser style={{ marginRight: 4 }} /> Speakers
          </button>
        </div>

        {!showSpeakers ? (
          <>
            {/* Day filter */}
            <div className="filter-tabs">
              <button className={`filter-tab${activeDay === 'all' ? ' active' : ''}`} onClick={() => setActiveDay('all')}>All Days</button>
              {PROGRAM_DAYS.map(day => (
                <button key={day.id} className={`filter-tab${activeDay === day.id ? ' active' : ''}`} onClick={() => setActiveDay(day.id)}>
                  {day.label}
                </button>
              ))}
            </div>

            {/* Type filter */}
            <div className="filter-tabs">
              {types.map(t => (
                <button key={t.id} className={`filter-tab${activeType === t.id ? ' active' : ''}`} onClick={() => setActiveType(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Track filter */}
            <div className="filter-tabs">
              <button className={`filter-tab${activeTrack === 'all' ? ' active' : ''}`} onClick={() => setActiveTrack('all')}>All Tracks</button>
              {THEMATIC_TRACKS.map(track => (
                <button key={track.id} className={`filter-tab${activeTrack === track.id ? ' active' : ''}`} onClick={() => setActiveTrack(track.id)} style={activeTrack === track.id ? { background: track.color, borderColor: track.color } : {}}>
                  {track.label}
                </button>
              ))}
            </div>

            {/* Sessions */}
            {filtered.length === 0 ? (
              <div className="content-card" style={{ textAlign: 'center', color: '#666' }}>
                <p>No sessions match your current filters. Try adjusting your selection.</p>
              </div>
            ) : (
              filtered.map(session => {
                const track = session.track ? getTrack(session.track) : null
                return (
                  <div key={session.id} className="session-card" style={track ? { borderLeftColor: track.color } : {}}>
                    <span className={`session-type ${session.type}`}>{session.type.replace('-', ' ')}</span>
                    {track && <span style={{ marginLeft: 8, fontSize: '0.8rem', color: track.color, fontWeight: 600 }}>{track.label}</span>}
                    <h3>{session.title}</h3>
                    <div className="session-meta">
                      <span><FaClock style={{ marginRight: 4 }} /> {session.time}</span>
                      <span><FaMapMarkerAlt style={{ marginRight: 4 }} /> {session.venue}</span>
                      {session.fee && <span><FaTicketAlt style={{ marginRight: 4 }} /> {formatCurrency(session.fee)}</span>}
                      {session.capacity && <span><FaUser style={{ marginRight: 4 }} /> Max {session.capacity} pax</span>}
                    </div>
                    <p style={{ marginTop: '0.8rem', color: '#555', lineHeight: 1.6 }}>{session.description}</p>
                    {session.speakers.length > 0 && (
                      <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {session.speakers.map(spId => {
                          const sp = getSpeaker(spId)
                          return sp ? (
                            <span key={spId} style={{ padding: '0.3rem 0.8rem', background: '#e3f2fd', borderRadius: 20, fontSize: '0.85rem', color: '#0066b3', fontWeight: 600 }}>
                              <FaUser style={{ marginRight: 4, fontSize: '0.7rem' }} /> {sp.name}
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </>
        ) : (
          /* Speakers Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {SPEAKERS.map(sp => (
              <div key={sp.id} className="speaker-card">
                <div className="speaker-avatar">
                  <FaUser />
                </div>
                <h3>{sp.name}</h3>
                <p className="speaker-title">{sp.title}</p>
                <p className="speaker-org">{sp.organization}</p>
                <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: '#555' }}>{sp.bio}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
