import PageHeader from '../components/common/PageHeader'
import { FaFilePdf, FaFileImage, FaFileAlt, FaDownload, FaCalendarAlt } from 'react-icons/fa'

const downloadCategories = [
  {
    title: 'Circulars & Advisories',
    items: [
      { name: 'AIWW 2027 First Circular', type: 'PDF', size: '2.4 MB', icon: FaFilePdf },
      { name: 'Registration Advisory', type: 'PDF', size: '1.1 MB', icon: FaFilePdf },
      { name: 'Call for Abstracts Guidelines', type: 'PDF', size: '890 KB', icon: FaFilePdf },
    ]
  },
  {
    title: 'Media Kit',
    items: [
      { name: 'AIWW 2027 Logo Pack', type: 'ZIP', size: '15 MB', icon: FaFileImage },
      { name: 'Brand Guidelines', type: 'PDF', size: '3.2 MB', icon: FaFilePdf },
      { name: 'Press Release Template', type: 'DOCX', size: '450 KB', icon: FaFileAlt },
    ]
  },
  {
    title: 'Program & Templates',
    items: [
      { name: 'Preliminary Program (Exportable)', type: 'PDF', size: '1.8 MB', icon: FaCalendarAlt },
      { name: 'Side Event Proposal Template', type: 'DOCX', size: '320 KB', icon: FaFileAlt },
      { name: 'Speaker Nomination Form', type: 'PDF', size: '510 KB', icon: FaFilePdf },
    ]
  },
  {
    title: 'Policy Documents',
    items: [
      { name: 'Privacy Policy', type: 'PDF', size: '280 KB', icon: FaFilePdf },
      { name: 'Terms of Use', type: 'PDF', size: '210 KB', icon: FaFilePdf },
      { name: 'Refund & Cancellation Policy', type: 'PDF', size: '190 KB', icon: FaFilePdf },
    ]
  }
]

export default function Downloads() {
  return (
    <>
      <PageHeader title="Downloads & Resources" subtitle="Access circulars, templates, media kits, and policy documents" />
      <div className="content-section">
        {downloadCategories.map(cat => (
          <div key={cat.title} className="content-card">
            <h2>{cat.title}</h2>
            <div className="download-list">
              {cat.items.map(item => (
                <div key={item.name} className="download-item">
                  <div className="dl-info">
                    <item.icon />
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.type} - {item.size}</p>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                    <FaDownload /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
