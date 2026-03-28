import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PageHeader from '../components/common/PageHeader'
import { FaUserPlus, FaCalendarPlus, FaMicrophone, FaPaperPlane } from 'react-icons/fa'

export default function Participation() {
  const [activeForm, setActiveForm] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    toast.success('Your submission has been received! We will contact you shortly.')
    reset()
    setActiveForm(null)
  }

  return (
    <>
      <PageHeader title="Participation" subtitle="Join the 4th Asia International Water Week as a participant, speaker, or organizer" />
      <div className="content-section">
        {/* Registration CTA */}
        <div className="content-card" style={{ textAlign: 'center', background: 'linear-gradient(145deg, #e3f2fd, #f0f9ff)' }}>
          <FaUserPlus style={{ fontSize: '3rem', color: '#0066b3', marginBottom: '1rem' }} />
          <h2 style={{ borderBottom: 'none' }}>Register as a Participant</h2>
          <p>Join thousands of water professionals, policymakers, and researchers at the 4th AIWW in Manila.</p>
          <Link to="/register" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
            Register Now <FaUserPlus style={{ marginLeft: 8 }} />
          </Link>
        </div>

        {/* Call for submissions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
          <div className="content-card">
            <h2><FaCalendarPlus style={{ marginRight: 8, color: '#0066b3' }} /> Call for Side Events</h2>
            <p>Organizations and institutions are invited to propose side events that complement the main AIWW program.</p>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
              <li>Duration: 90-180 minutes</li>
              <li>Must align with AIWW thematic areas</li>
              <li>Venue and AV support provided</li>
              <li>Submission deadline: December 31, 2026</li>
            </ul>
            <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setActiveForm('side-event')}>
              Submit Proposal <FaPaperPlane style={{ marginLeft: 8 }} />
            </button>
          </div>

          <div className="content-card">
            <h2><FaMicrophone style={{ marginRight: 8, color: '#0066b3' }} /> Call for Speakers</h2>
            <p>We are seeking thematic session coordinators and speakers to share their expertise and insights.</p>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
              <li>Expertise in water-related topics</li>
              <li>Academic or professional credentials</li>
              <li>Presentation materials required</li>
              <li>Submission deadline: January 31, 2027</li>
            </ul>
            <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setActiveForm('speaker')}>
              Apply as Speaker <FaPaperPlane style={{ marginLeft: 8 }} />
            </button>
          </div>
        </div>

        {/* Submission Form */}
        {activeForm && (
          <div className="content-card">
            <h2>{activeForm === 'side-event' ? 'Side Event Proposal' : 'Speaker Application'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input {...register('name', { required: 'Name is required' })} placeholder="Your full name" />
                  {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" {...register('email', { required: 'Email is required' })} placeholder="your@email.com" />
                  {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Organization *</label>
                  <input {...register('organization', { required: 'Required' })} placeholder="Your organization" />
                  {errors.organization && <span className="error">{errors.organization.message}</span>}
                </div>
                <div className="form-group">
                  <label>Country *</label>
                  <input {...register('country', { required: 'Required' })} placeholder="Your country" />
                  {errors.country && <span className="error">{errors.country.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <label>{activeForm === 'side-event' ? 'Proposed Title *' : 'Area of Expertise *'}</label>
                <input {...register('title', { required: 'Required' })} placeholder={activeForm === 'side-event' ? 'Title of your proposed side event' : 'Your area of expertise'} />
                {errors.title && <span className="error">{errors.title.message}</span>}
              </div>
              <div className="form-group">
                <label>{activeForm === 'side-event' ? 'Event Description *' : 'Brief Bio & Proposed Topic *'}</label>
                <textarea {...register('description', { required: 'Required' })} rows={5} placeholder={activeForm === 'side-event' ? 'Describe your proposed side event, objectives, and expected participants...' : 'Provide a brief bio and describe your proposed presentation topic...'} />
                {errors.description && <span className="error">{errors.description.message}</span>}
              </div>
              <div className="btn-group">
                <button type="button" className="btn-secondary" onClick={() => setActiveForm(null)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit <FaPaperPlane /></button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
