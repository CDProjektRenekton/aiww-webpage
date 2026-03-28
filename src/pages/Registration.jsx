import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PageHeader from '../components/common/PageHeader'
import { PARTICIPANT_CATEGORIES, ADD_ONS, PAYMENT_METHODS, COUNTRIES } from '../data/registrationConfig'
import { formatCurrency, generateRegistrationId, calculateFees } from '../utils/helpers'
import { useRegistrationStore } from '../store/useStore'
import { FaUser, FaCreditCard, FaCheckCircle, FaArrowRight, FaArrowLeft, FaQrcode } from 'react-icons/fa'

const STEPS = [
  { num: 1, label: 'Personal Info', icon: FaUser },
  { num: 2, label: 'Category & Add-ons', icon: FaCreditCard },
  { num: 3, label: 'Payment', icon: FaCreditCard },
  { num: 4, label: 'Confirmation', icon: FaCheckCircle },
]

export default function Registration() {
  const { step, setStep, formData, updateFormData, reset } = useRegistrationStore()
  const [selectedCategory, setSelectedCategory] = useState(formData.category || 'regular')
  const [selectedAddOns, setSelectedAddOns] = useState(formData.addOns || [])
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [registrationId, setRegistrationId] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  })

  const fees = useMemo(() => calculateFees(selectedCategory, selectedAddOns, PARTICIPANT_CATEGORIES, ADD_ONS), [selectedCategory, selectedAddOns])

  const toggleAddOn = (id) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  const onStep1Submit = (data) => {
    updateFormData(data)
    setStep(2)
  }

  const onStep2Next = () => {
    updateFormData({ category: selectedCategory, addOns: selectedAddOns })
    setStep(3)
  }

  const onStep3Submit = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }
    const id = generateRegistrationId()
    setRegistrationId(id)
    setStep(4)
    toast.success('Registration successful!')
  }

  const startOver = () => {
    reset()
    setSelectedCategory('regular')
    setSelectedAddOns([])
    setPaymentMethod(null)
    setRegistrationId(null)
  }

  return (
    <>
      <PageHeader title="Registration" subtitle="Register for the 4th Asia International Water Week" />
      <div className="registration-container">
        {/* Step indicators */}
        <div className="reg-steps">
          {STEPS.map(s => (
            <div key={s.num} className={`reg-step${step === s.num ? ' active' : ''}${step > s.num ? ' completed' : ''}`}>
              <s.icon /> {s.label}
            </div>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="content-card">
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit(onStep1Submit)}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input {...register('firstName', { required: 'First name is required' })} placeholder="Enter first name" />
                  {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input {...register('lastName', { required: 'Last name is required' })} placeholder="Enter last name" />
                  {errors.lastName && <span className="error">{errors.lastName.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} placeholder="Enter email address" />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Organization *</label>
                  <input {...register('organization', { required: 'Organization is required' })} placeholder="Enter organization" />
                  {errors.organization && <span className="error">{errors.organization.message}</span>}
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input {...register('designation')} placeholder="Enter designation/title" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Country *</label>
                  <select {...register('country', { required: 'Country is required' })}>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.country && <span className="error">{errors.country.message}</span>}
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" {...register('phone')} placeholder="+63 xxx xxx xxxx" />
                </div>
              </div>
              <div className="btn-group">
                <button type="submit" className="btn-primary">Next: Category & Add-ons <FaArrowRight /></button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Category & Add-ons */}
        {step === 2 && (
          <div className="content-card">
            <h2>Select Registration Category</h2>
            <div className="category-cards">
              {PARTICIPANT_CATEGORIES.map(cat => (
                <div key={cat.id} className={`category-card${selectedCategory === cat.id ? ' selected' : ''}`} onClick={() => setSelectedCategory(cat.id)}>
                  <h4>{cat.label}</h4>
                  <div className="price">{formatCurrency(cat.fee)}</div>
                  {cat.deadline && <div className="price-note">Until {cat.deadline}</div>}
                </div>
              ))}
            </div>

            <h2 style={{ marginTop: '2rem' }}>Optional Add-ons</h2>
            <div className="checkbox-group">
              {ADD_ONS.map(addon => (
                <div key={addon.id} className={`checkbox-item${selectedAddOns.includes(addon.id) ? ' selected' : ''}`} onClick={() => toggleAddOn(addon.id)}>
                  <input type="checkbox" checked={selectedAddOns.includes(addon.id)} onChange={() => toggleAddOn(addon.id)} />
                  <div style={{ flex: 1 }}>
                    <strong>{addon.label}</strong>
                    <span style={{ color: '#666', fontSize: '0.9rem', marginLeft: 8 }}>({addon.capacity} slots)</span>
                  </div>
                  <strong style={{ color: '#0066b3' }}>{formatCurrency(addon.fee)}</strong>
                </div>
              ))}
            </div>

            {/* Fee Summary */}
            <div className="fee-summary">
              <div className="fee-line"><span>Registration ({PARTICIPANT_CATEGORIES.find(c => c.id === selectedCategory)?.label})</span><span>{formatCurrency(fees.baseFee)}</span></div>
              {selectedAddOns.map(id => {
                const addon = ADD_ONS.find(a => a.id === id)
                return addon ? <div className="fee-line" key={id}><span>{addon.label}</span><span>{formatCurrency(addon.fee)}</span></div> : null
              })}
              <div className="fee-total"><span>Total</span><span>{formatCurrency(fees.total)}</span></div>
            </div>

            <div className="btn-group">
              <button className="btn-secondary" onClick={() => setStep(1)}><FaArrowLeft /> Back</button>
              <button className="btn-primary" onClick={onStep2Next}>Next: Payment <FaArrowRight /></button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="content-card">
            <h2>Select Payment Method</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Choose from the available payment options below. At least 3 payment methods are supported for your convenience.</p>
            <div className="payment-methods">
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.id} className={`payment-method${paymentMethod === pm.id ? ' selected' : ''}`} onClick={() => setPaymentMethod(pm.id)}>
                  <FaCreditCard />
                  <p>{pm.label}</p>
                </div>
              ))}
            </div>

            <div className="fee-summary">
              <div className="fee-total"><span>Amount Due</span><span>{formatCurrency(fees.total)}</span></div>
            </div>

            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>
              By proceeding, you agree to the <a href="/legal/refund-policy" style={{ color: '#0066b3' }}>Refund & Cancellation Policy</a> and <a href="/legal/terms" style={{ color: '#0066b3' }}>Terms of Use</a>.
            </p>

            <div className="btn-group">
              <button className="btn-secondary" onClick={() => setStep(2)}><FaArrowLeft /> Back</button>
              <button className="btn-primary" onClick={onStep3Submit}>Complete Payment <FaCheckCircle /></button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="content-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', color: '#4caf50', marginBottom: '1rem' }}><FaCheckCircle /></div>
            <h2 style={{ color: '#4caf50', borderBottom: 'none' }}>Registration Successful!</h2>
            <p style={{ fontSize: '1.1rem' }}>Thank you for registering for the 4th Asia International Water Week.</p>

            <div style={{ background: '#f0f9ff', borderRadius: 15, padding: '1.5rem', margin: '2rem auto', maxWidth: 500 }}>
              <p><strong>Registration ID:</strong> {registrationId}</p>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Organization:</strong> {formData.organization}</p>
              <p><strong>Category:</strong> {PARTICIPANT_CATEGORIES.find(c => c.id === selectedCategory)?.label}</p>
              <p><strong>Total Paid:</strong> {formatCurrency(fees.total)}</p>
              <p><strong>Payment Status:</strong> <span className="status-badge paid">Paid</span></p>
            </div>

            <div style={{ margin: '1.5rem 0' }}>
              <div style={{ width: 150, height: 150, background: '#003366', borderRadius: 15, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem' }}>
                <FaQrcode />
              </div>
              <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>Your QR-coded digital receipt</p>
            </div>

            <p style={{ color: '#666' }}>A confirmation email with your digital receipt and QR code has been sent to <strong>{formData.email}</strong>.</p>

            <div className="btn-group">
              <button className="btn-primary" onClick={startOver}>Register Another Participant</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
