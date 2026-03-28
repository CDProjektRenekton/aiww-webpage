import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaChartBar, FaUsers, FaMoneyBillWave, FaFileExport, FaSearch, FaCheckCircle, FaClock, FaTimesCircle, FaUndoAlt, FaCog, FaClipboardList, FaEnvelope } from 'react-icons/fa'
import { formatCurrency, exportToCSV } from '../utils/helpers'
import { PARTICIPANT_CATEGORIES } from '../data/registrationConfig'

const MOCK_REGISTRATIONS = [
  { id: 'AIWW27-A1B2C3-XY01', firstName: 'Juan', lastName: 'Dela Cruz', email: 'juan@example.com', organization: 'DPWH', country: 'Philippines', category: 'government', status: 'paid', amount: 12000, date: '2026-04-01', addOns: ['gala-dinner'] },
  { id: 'AIWW27-D4E5F6-ZW02', firstName: 'Yuki', lastName: 'Tanaka', email: 'yuki@example.jp', organization: 'Tokyo Water Bureau', country: 'Japan', category: 'international', status: 'paid', amount: 30000, date: '2026-04-02', addOns: ['gala-dinner', 'field-trip-a'] },
  { id: 'AIWW27-G7H8I9-QR03', firstName: 'Maria', lastName: 'Santos', email: 'maria@example.com', organization: 'UP Diliman', country: 'Philippines', category: 'student', status: 'paid', amount: 8000, date: '2026-04-03', addOns: [] },
  { id: 'AIWW27-J1K2L3-MN04', firstName: 'Li', lastName: 'Wei', email: 'li.wei@example.cn', organization: 'Beijing Water Authority', country: 'China', category: 'international', status: 'pending', amount: 25000, date: '2026-04-04', addOns: ['workshop-1'] },
  { id: 'AIWW27-O4P5Q6-ST05', firstName: 'Arun', lastName: 'Patel', email: 'arun@example.in', organization: 'NITI Aayog', country: 'India', category: 'government', status: 'paid', amount: 17000, date: '2026-04-05', addOns: ['gala-dinner'] },
  { id: 'AIWW27-U7V8W9-EF06', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@example.au', organization: 'Water Corp Australia', country: 'Australia', category: 'regular', status: 'paid', amount: 25000, date: '2026-04-06', addOns: ['gala-dinner', 'field-trip-b'] },
  { id: 'AIWW27-X1Y2Z3-GH07', firstName: 'Kim', lastName: 'Min-jun', email: 'kim@example.kr', organization: 'K-Water', country: 'Korea (South)', category: 'early-bird', status: 'paid', amount: 20000, date: '2026-03-20', addOns: ['gala-dinner', 'workshop-2'] },
  { id: 'AIWW27-AB12CD-IJ08', firstName: 'Nguyen', lastName: 'Van Minh', email: 'nguyen@example.vn', organization: 'VWSA', country: 'Vietnam', category: 'regular', status: 'failed', amount: 20000, date: '2026-04-07', addOns: [] },
  { id: 'AIWW27-EF34GH-KL09', firstName: 'Rizal', lastName: 'Ahmad', email: 'rizal@example.my', organization: 'SPAN Malaysia', country: 'Malaysia', category: 'government', status: 'refunded', amount: 12000, date: '2026-03-25', addOns: ['field-trip-c'] },
  { id: 'AIWW27-IJ56KL-MN10', firstName: 'Ana', lastName: 'Reyes', email: 'ana@example.com', organization: 'MWSS', country: 'Philippines', category: 'local', status: 'paid', amount: 15000, date: '2026-04-08', addOns: [] },
]

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
  { id: 'registrations', label: 'Registrations', icon: FaUsers },
  { id: 'payments', label: 'Payments', icon: FaMoneyBillWave },
  { id: 'reports', label: 'Reports', icon: FaFileExport },
  { id: 'email', label: 'Email Broadcast', icon: FaEnvelope },
  { id: 'settings', label: 'Settings', icon: FaCog },
]

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [registrations, setRegistrations] = useState(MOCK_REGISTRATIONS)

  const stats = useMemo(() => {
    const paid = registrations.filter(r => r.status === 'paid')
    const pending = registrations.filter(r => r.status === 'pending')
    const revenue = paid.reduce((sum, r) => sum + r.amount, 0)
    const byCategory = PARTICIPANT_CATEGORIES.map(cat => ({
      ...cat,
      count: registrations.filter(r => r.category === cat.id).length,
    }))
    return { total: registrations.length, paid: paid.length, pending: pending.length, failed: registrations.filter(r => r.status === 'failed').length, refunded: registrations.filter(r => r.status === 'refunded').length, revenue, byCategory }
  }, [registrations])

  const filtered = registrations.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return r.firstName.toLowerCase().includes(q) || r.lastName.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.organization.toLowerCase().includes(q)
    }
    return true
  })

  const handleStatusChange = (regId, newStatus) => {
    setRegistrations(prev => prev.map(r => r.id === regId ? { ...r, status: newStatus } : r))
  }

  const handleExport = (type) => {
    const data = filtered.map(r => ({
      'Registration ID': r.id,
      'First Name': r.firstName,
      'Last Name': r.lastName,
      'Email': r.email,
      'Organization': r.organization,
      'Country': r.country,
      'Category': r.category,
      'Status': r.status,
      'Amount': r.amount,
      'Date': r.date,
      'Add-Ons': r.addOns.join('; '),
    }))
    exportToCSV(data, `aiww-${type}-${new Date().toISOString().split('T')[0]}.csv`)
  }

  return (
    <>
      <Helmet><title>Admin Dashboard | AIWW 2027</title></Helmet>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontSize: '1.1rem' }}>Admin Panel</h3>
            <p style={{ color: '#7fc9ff', fontSize: '0.8rem' }}>AIWW 2027</p>
          </div>
          {sections.map(s => (
            <a key={s.id} className={activeSection === s.id ? 'active' : ''} onClick={() => setActiveSection(s.id)} style={{ cursor: 'pointer' }}>
              <s.icon /> {s.label}
            </a>
          ))}
        </aside>

        <main className="admin-main">
          {/* Dashboard Overview */}
          {activeSection === 'dashboard' && (
            <>
              <h2 style={{ color: '#003366', marginBottom: '1.5rem' }}>Dashboard Overview</h2>
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <h4>Total Registrations</h4>
                  <div className="stat-value">{stats.total}</div>
                </div>
                <div className="admin-stat-card" style={{ borderLeftColor: '#4caf50' }}>
                  <h4>Paid</h4>
                  <div className="stat-value" style={{ color: '#4caf50' }}>{stats.paid}</div>
                </div>
                <div className="admin-stat-card" style={{ borderLeftColor: '#ff9800' }}>
                  <h4>Pending</h4>
                  <div className="stat-value" style={{ color: '#ff9800' }}>{stats.pending}</div>
                </div>
                <div className="admin-stat-card" style={{ borderLeftColor: '#0066b3' }}>
                  <h4>Total Revenue</h4>
                  <div className="stat-value" style={{ fontSize: '1.8rem' }}>{formatCurrency(stats.revenue)}</div>
                </div>
              </div>

              <div className="content-card">
                <h2>Category Breakdown</h2>
                <table className="admin-table">
                  <thead>
                    <tr><th>Category</th><th>Fee</th><th>Registrations</th></tr>
                  </thead>
                  <tbody>
                    {stats.byCategory.map(cat => (
                      <tr key={cat.id}><td>{cat.label}</td><td>{formatCurrency(cat.fee)}</td><td>{cat.count}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="content-card">
                <h2>Payment Status Overview</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  {[
                    { label: 'Paid', count: stats.paid, icon: FaCheckCircle, color: '#4caf50' },
                    { label: 'Pending', count: stats.pending, icon: FaClock, color: '#ff9800' },
                    { label: 'Failed', count: stats.failed, icon: FaTimesCircle, color: '#e74c3c' },
                    { label: 'Refunded', count: stats.refunded, icon: FaUndoAlt, color: '#2196f3' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <item.icon style={{ fontSize: '1.5rem', color: item.color }} />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#003366' }}>{item.count}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Registrations List */}
          {activeSection === 'registrations' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ color: '#003366', margin: 0 }}>Registrations</h2>
                <button className="btn-primary" onClick={() => handleExport('registrations')} style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  <FaFileExport /> Export CSV
                </button>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
                  <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input type="text" placeholder="Search by name, email, ID, or org..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '2px solid #cce7f5', borderRadius: 8, fontSize: '0.9rem' }} />
                </div>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '0.6rem 1rem', border: '2px solid #cce7f5', borderRadius: 8, fontSize: '0.9rem' }}>
                  <option value="all">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr><th>Reg ID</th><th>Name</th><th>Organization</th><th>Country</th><th>Category</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map(r => (
                      <tr key={r.id}>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{r.id}</td>
                        <td><strong>{r.firstName} {r.lastName}</strong><br /><span style={{ fontSize: '0.8rem', color: '#666' }}>{r.email}</span></td>
                        <td>{r.organization}</td>
                        <td>{r.country}</td>
                        <td>{r.category}</td>
                        <td>{formatCurrency(r.amount)}</td>
                        <td><span className={`status-badge ${r.status}`}>{r.status}</span></td>
                        <td>
                          <select value={r.status} onChange={e => handleStatusChange(r.id, e.target.value)} style={{ padding: '0.3rem', fontSize: '0.8rem', borderRadius: 5, border: '1px solid #ccc' }}>
                            <option value="paid">Mark Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '1rem' }}>Showing {filtered.length} of {registrations.length} registrations</p>
            </>
          )}

          {/* Payments */}
          {activeSection === 'payments' && (
            <>
              <h2 style={{ color: '#003366', marginBottom: '1.5rem' }}>Payment Records</h2>
              <div className="admin-stats">
                <div className="admin-stat-card" style={{ borderLeftColor: '#4caf50' }}>
                  <h4>Total Revenue (Paid)</h4>
                  <div className="stat-value" style={{ fontSize: '1.8rem' }}>{formatCurrency(stats.revenue)}</div>
                </div>
                <div className="admin-stat-card" style={{ borderLeftColor: '#ff9800' }}>
                  <h4>Pending Amount</h4>
                  <div className="stat-value" style={{ fontSize: '1.8rem' }}>{formatCurrency(registrations.filter(r => r.status === 'pending').reduce((s, r) => s + r.amount, 0))}</div>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr><th>Reg ID</th><th>Name</th><th>Amount</th><th>Status</th><th>Date</th><th>Method</th></tr>
                  </thead>
                  <tbody>
                    {registrations.map(r => (
                      <tr key={r.id}>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{r.id}</td>
                        <td>{r.firstName} {r.lastName}</td>
                        <td>{formatCurrency(r.amount)}</td>
                        <td><span className={`status-badge ${r.status}`}>{r.status}</span></td>
                        <td>{r.date}</td>
                        <td>Credit Card</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Reports */}
          {activeSection === 'reports' && (
            <>
              <h2 style={{ color: '#003366', marginBottom: '1.5rem' }}>Export Reports</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: 'Registrant List', desc: 'Full list of all registrants with contact details', type: 'registrations' },
                  { title: 'Payment Report', desc: 'Payment records with status and amounts', type: 'payments' },
                  { title: 'Add-On Participation', desc: 'Breakdown of add-on selections (gala, field trips, workshops)', type: 'addons' },
                  { title: 'Badge Data Export', desc: 'Formatted data for onsite badge printing', type: 'badges' },
                ].map(report => (
                  <div key={report.type} className="content-card" style={{ textAlign: 'center' }}>
                    <FaClipboardList style={{ fontSize: '2rem', color: '#0066b3', marginBottom: '0.8rem' }} />
                    <h3 style={{ color: '#003366' }}>{report.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>{report.desc}</p>
                    <button className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }} onClick={() => handleExport(report.type)}>
                      <FaFileExport /> Export CSV
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Email Broadcast */}
          {activeSection === 'email' && (
            <>
              <h2 style={{ color: '#003366', marginBottom: '1.5rem' }}>Email Broadcast</h2>
              <div className="content-card">
                <h2>Send Advisory</h2>
                <p style={{ color: '#666', marginBottom: '1rem' }}>Broadcast an email to all registered participants or a filtered subset.</p>
                <div className="form-group">
                  <label>Recipients</label>
                  <select style={{ width: '100%', padding: '0.8rem', border: '2px solid #cce7f5', borderRadius: 10 }}>
                    <option>All Registrants ({registrations.length})</option>
                    <option>Paid Only ({stats.paid})</option>
                    <option>Pending Only ({stats.pending})</option>
                    <option>International Delegates</option>
                    <option>Local Delegates</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Email subject line..." style={{ width: '100%', padding: '0.8rem', border: '2px solid #cce7f5', borderRadius: 10 }} />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows={8} placeholder="Compose your advisory message..." style={{ width: '100%', padding: '0.8rem', border: '2px solid #cce7f5', borderRadius: 10, fontSize: '1rem' }} />
                </div>
                <button className="btn-primary"><FaEnvelope style={{ marginRight: 8 }} /> Send Broadcast</button>
              </div>
            </>
          )}

          {/* Settings */}
          {activeSection === 'settings' && (
            <>
              <h2 style={{ color: '#003366', marginBottom: '1.5rem' }}>System Settings</h2>
              <div className="content-card">
                <h2>Registration Settings</h2>
                <div className="form-group">
                  <label>Registration Status</label>
                  <select style={{ width: '100%', padding: '0.8rem', border: '2px solid #cce7f5', borderRadius: 10 }}>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Early Bird Only</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Early Bird Deadline</label>
                  <input type="date" defaultValue="2027-01-31" style={{ width: '100%', padding: '0.8rem', border: '2px solid #cce7f5', borderRadius: 10 }} />
                </div>
                <div className="form-group">
                  <label>Field Trip Capacity Cap</label>
                  <input type="number" defaultValue={40} style={{ width: '100%', padding: '0.8rem', border: '2px solid #cce7f5', borderRadius: 10 }} />
                </div>
              </div>
              <div className="content-card">
                <h2>Access Control</h2>
                <p>Role-based access: Admin, Editor, Author</p>
                <table className="admin-table" style={{ marginTop: '1rem' }}>
                  <thead><tr><th>User</th><th>Role</th><th>Last Login</th></tr></thead>
                  <tbody>
                    <tr><td>admin@mwss.gov.ph</td><td>Admin</td><td>2026-03-28</td></tr>
                    <tr><td>editor@mwss.gov.ph</td><td>Editor</td><td>2026-03-27</td></tr>
                    <tr><td>content@mwss.gov.ph</td><td>Author</td><td>2026-03-25</td></tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}
