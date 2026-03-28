import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PageHeader from '../components/common/PageHeader'
import { SPONSORSHIP_TIERS, EXHIBITOR_PACKAGES } from '../data/sponsorshipData'
import { formatCurrency } from '../utils/helpers'
import { FaDownload, FaPaperPlane, FaCheck } from 'react-icons/fa'

export default function Exhibition() {
  const [activeTab, setActiveTab] = useState('sponsors')
  const [showInquiry, setShowInquiry] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    toast.success('Inquiry submitted! Our team will contact you within 48 hours.')
    reset()
    setShowInquiry(false)
  }

  return (
    <>
      <PageHeader title="Exhibition & Sponsorship" subtitle="Partner with AIWW 2027 and showcase your brand to water professionals across Asia" />
      <div className="content-section">
        <div className="filter-tabs">
          <button className={`filter-tab${activeTab === 'sponsors' ? ' active' : ''}`} onClick={() => setActiveTab('sponsors')}>Sponsorship Packages</button>
          <button className={`filter-tab${activeTab === 'exhibitors' ? ' active' : ''}`} onClick={() => setActiveTab('exhibitors')}>Exhibitor Packages</button>
        </div>

        {activeTab === 'sponsors' && (
          <>
            <div className="tier-cards">
              {SPONSORSHIP_TIERS.map(tier => (
                <div key={tier.id} className="tier-card">
                  <div className="tier-header" style={{ background: `linear-gradient(145deg, ${tier.color}22, ${tier.color}11)` }}>
                    <h3>{tier.name}</h3>
                    <div className="tier-price">{formatCurrency(tier.price)}</div>
                  </div>
                  <ul className="tier-benefits">
                    {tier.benefits.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  <div style={{ padding: '0 2rem 1.5rem', textAlign: 'center' }}>
                    <button className="btn-primary" onClick={() => setShowInquiry(true)}>Inquire Now</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="content-card" style={{ textAlign: 'center' }}>
              <h2 style={{ borderBottom: 'none' }}>Download Sponsorship Kit</h2>
              <p>Get the complete sponsorship package details, benefits comparison, and booking form.</p>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>
                <FaDownload style={{ marginRight: 8 }} /> Download Sponsorship Kit (PDF)
              </button>
            </div>
          </>
        )}

        {activeTab === 'exhibitors' && (
          <>
            <div className="tier-cards">
              {EXHIBITOR_PACKAGES.map(pkg => (
                <div key={pkg.id} className="tier-card">
                  <div className="tier-header">
                    <h3>{pkg.name}</h3>
                    <p style={{ color: '#666' }}>{pkg.size}</p>
                    <div className="tier-price">{formatCurrency(pkg.price)}</div>
                  </div>
                  <ul className="tier-benefits">
                    {pkg.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}
                  </ul>
                  <div style={{ padding: '0 2rem 1.5rem', textAlign: 'center' }}>
                    <button className="btn-primary" onClick={() => setShowInquiry(true)}>Book This Booth</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Inquiry Form */}
        {showInquiry && (
          <div className="content-card">
            <h2>Sponsor/Exhibitor Inquiry</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name *</label>
                  <input {...register('company', { required: 'Required' })} placeholder="Your company name" />
                  {errors.company && <span className="error">{errors.company.message}</span>}
                </div>
                <div className="form-group">
                  <label>Contact Person *</label>
                  <input {...register('contact', { required: 'Required' })} placeholder="Full name" />
                  {errors.contact && <span className="error">{errors.contact.message}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" {...register('email', { required: 'Required' })} placeholder="your@company.com" />
                  {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                <div className="form-group">
                  <label>Interest</label>
                  <select {...register('interest')}>
                    <option value="">Select...</option>
                    <option value="platinum">Platinum Sponsorship</option>
                    <option value="gold">Gold Sponsorship</option>
                    <option value="silver">Silver Sponsorship</option>
                    <option value="bronze">Bronze Sponsorship</option>
                    <option value="exhibition">Exhibition Booth</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea {...register('message')} rows={4} placeholder="Additional requirements or questions..." />
              </div>
              <div className="btn-group">
                <button type="button" className="btn-secondary" onClick={() => setShowInquiry(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit Inquiry <FaPaperPlane /></button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
