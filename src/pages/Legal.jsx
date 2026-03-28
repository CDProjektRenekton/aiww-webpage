import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import { REFUND_POLICY } from '../data/registrationConfig'

const pages = {
  'privacy': { title: 'Privacy Policy', content: PrivacyContent },
  'terms': { title: 'Terms of Use', content: TermsContent },
  'cookies': { title: 'Cookie Notice', content: CookieContent },
  'refund-policy': { title: 'Refund & Cancellation Policy', content: RefundContent },
}

export default function Legal() {
  const { page } = useParams()

  if (!page) {
    return (
      <>
        <PageHeader title="Legal & Policy" subtitle="Important legal documents and policies" />
        <div className="content-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(pages).map(([key, val]) => (
              <Link key={key} to={`/legal/${key}`} className="content-card" style={{ textDecoration: 'none', textAlign: 'center', transition: '0.3s', cursor: 'pointer' }}>
                <h3 style={{ color: '#003366' }}>{val.title}</h3>
                <p style={{ color: '#0066b3', fontWeight: 600, marginTop: '0.5rem' }}>Read More →</p>
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }

  const currentPage = pages[page]
  if (!currentPage) {
    return (
      <>
        <PageHeader title="Page Not Found" />
        <div className="content-section"><div className="content-card"><p>The requested legal page was not found.</p></div></div>
      </>
    )
  }

  const Content = currentPage.content
  return (
    <>
      <PageHeader title={currentPage.title} />
      <div className="content-section">
        <div className="content-card">
          <Content />
        </div>
      </div>
    </>
  )
}

function PrivacyContent() {
  return (
    <>
      <h2>Privacy Policy</h2>
      <p><strong>Effective Date:</strong> March 2026</p>
      <p>The 4th Asia International Water Week (AIWW) National Organizing Committee is committed to protecting your personal data in compliance with the Philippine Data Privacy Act of 2012 (RA 10173).</p>
      <h3>Information We Collect</h3>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
        <li>Personal identification: name, email, phone, organization, designation, country</li>
        <li>Registration details: category, add-ons, payment information</li>
        <li>Website usage data: browser type, pages visited, IP address (anonymized)</li>
      </ul>
      <h3>How We Use Your Information</h3>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
        <li>Process and manage your event registration</li>
        <li>Send confirmation emails, receipts, and event advisories</li>
        <li>Improve website functionality and user experience</li>
        <li>Comply with legal obligations</li>
      </ul>
      <h3>Data Protection</h3>
      <p>All registration data is transmitted via HTTPS encryption. Access to personal data is restricted to authorized personnel with role-based access controls. Data is stored on secure servers with regular backups.</p>
      <h3>Contact</h3>
      <p>For privacy inquiries, contact the Data Protection Officer at <strong>aiww@mwss.gov.ph</strong>.</p>
    </>
  )
}

function TermsContent() {
  return (
    <>
      <h2>Terms of Use</h2>
      <p><strong>Effective Date:</strong> March 2026</p>
      <p>By accessing the 4th AIWW website, you agree to these terms and conditions.</p>
      <h3>Use of Website</h3>
      <p>This website is intended for informational purposes related to the 4th Asia International Water Week. Users may browse, register for the event, and access published materials.</p>
      <h3>Intellectual Property</h3>
      <p>All content, designs, logos, and materials on this website are the property of the 4th AIWW National Organizing Committee or their respective owners. Reproduction without written permission is prohibited.</p>
      <h3>Registration Obligations</h3>
      <p>Users who register for the event agree to provide accurate, complete information. Misrepresentation may result in cancellation of registration without refund.</p>
      <h3>Limitation of Liability</h3>
      <p>The organizers are not liable for any indirect, incidental, or consequential damages arising from the use of this website or participation in the event.</p>
    </>
  )
}

function CookieContent() {
  return (
    <>
      <h2>Cookie Notice</h2>
      <p><strong>Effective Date:</strong> March 2026</p>
      <p>This website uses cookies to enhance your browsing experience and provide analytics.</p>
      <h3>Types of Cookies</h3>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
        <li><strong>Essential Cookies:</strong> Required for website functionality (session management, security)</li>
        <li><strong>Analytics Cookies:</strong> Help us understand visitor behavior (Google Analytics)</li>
        <li><strong>Preference Cookies:</strong> Remember your language and display preferences</li>
      </ul>
      <h3>Managing Cookies</h3>
      <p>You can manage or disable cookies through your browser settings. Disabling essential cookies may affect website functionality.</p>
    </>
  )
}

function RefundContent() {
  return (
    <>
      <h2>Refund & Cancellation Policy</h2>
      <p><strong>Effective Date:</strong> March 2026</p>
      <p>The following refund schedule applies to all paid registrations and activity fees (field trips, gala dinner, workshops):</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#003366', color: 'white' }}>
            <th style={{ padding: '0.8rem', textAlign: 'left' }}>Cancellation Deadline</th>
            <th style={{ padding: '0.8rem', textAlign: 'left' }}>Refund</th>
          </tr>
        </thead>
        <tbody>
          {REFUND_POLICY.map((rule, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e0f2fe' }}>
              <td style={{ padding: '0.8rem' }}>{rule.deadline ? `Before ${rule.deadline}` : 'After deadline'}</td>
              <td style={{ padding: '0.8rem' }}>{rule.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ marginTop: '1.5rem' }}>How to Request a Refund</h3>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#555' }}>
        <li>Send a cancellation request to <strong>aiww@mwss.gov.ph</strong></li>
        <li>Include your Registration ID, full name, and reason for cancellation</li>
        <li>Refunds will be processed within 15-30 business days</li>
        <li>Refunds are issued via the original payment method</li>
      </ul>
      <h3>Field Trips & Activities</h3>
      <p>Paid activities with limited capacity (field trips, technical tours) follow the same refund schedule. Slots released via cancellation may be offered to waitlisted participants.</p>
    </>
  )
}
