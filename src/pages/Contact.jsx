import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PageHeader from '../components/common/PageHeader'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaYoutube, FaInstagram, FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    toast.success('Your message has been sent! We will respond within 2 business days.')
    reset()
  }

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Get in touch with the AIWW 2027 Secretariat" />
      <div className="content-section">
        <div className="contact-grid">
          <div>
            <div className="content-card">
              <h2>Secretariat Contact Details</h2>
              <div className="contact-info-card">
                <FaEnvelope />
                <div>
                  <h4>Email</h4>
                  <p style={{ textTransform: 'lowercase' }}>aiww@mwss.gov.ph</p>
                </div>
              </div>
              <div className="contact-info-card">
                <FaPhone />
                <div>
                  <h4>Phone</h4>
                  <p>(02) 8920-5521</p>
                  <p style={{ fontSize: '0.85rem', color: '#888' }}>+63 943 464 8776 (Smart) | +63 956 274 8453 (Globe)</p>
                </div>
              </div>
              <div className="contact-info-card">
                <FaMapMarkerAlt />
                <div>
                  <h4>Address</h4>
                  <p>4th Floor, Administration Building, MWSS Complex, 489 Katipunan Avenue, Balara, Quezon City 1119, Philippines</p>
                </div>
              </div>
              <div className="contact-info-card">
                <FaFacebook />
                <div>
                  <h4>Social Media</h4>
                  <p style={{ display: 'flex', gap: '1rem', marginTop: '0.3rem' }}>
                    <FaFacebook style={{ fontSize: '1.3rem', color: '#1877f2', cursor: 'pointer' }} />
                    <FaYoutube style={{ fontSize: '1.3rem', color: '#ff0000', cursor: 'pointer' }} />
                    <FaInstagram style={{ fontSize: '1.3rem', color: '#e4405f', cursor: 'pointer' }} />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Inquiry Type *</label>
                <select {...register('type', { required: 'Please select an inquiry type' })}>
                  <option value="">Select type...</option>
                  <option value="general">General Inquiry</option>
                  <option value="registration">Registration</option>
                  <option value="sponsorship">Sponsorship & Exhibition</option>
                  <option value="program">Program & Sessions</option>
                  <option value="media">Media & Press</option>
                </select>
                {errors.type && <span className="error">{errors.type.message}</span>}
              </div>
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
              <div className="form-group">
                <label>Subject *</label>
                <input {...register('subject', { required: 'Subject is required' })} placeholder="Message subject" />
                {errors.subject && <span className="error">{errors.subject.message}</span>}
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea {...register('message', { required: 'Message is required' })} rows={5} placeholder="Your message..." />
                {errors.message && <span className="error">{errors.message.message}</span>}
              </div>
              <button type="submit" className="btn-primary">Send Message <FaPaperPlane /></button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
