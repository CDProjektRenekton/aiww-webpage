import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, path, type = 'website' }) {
  const siteUrl = 'https://aiww2027.com'
  const fullTitle = title ? `${title} | AIWW 2027` : 'AIWW 2027 | 4th Asia International Water Week'
  const desc = description || 'Official website of the 4th Asia International Water Week (AIWW) 2027, Manila, Philippines. Sustainable Water Solutions for a Resilient Asia.'
  const url = path ? `${siteUrl}${path}` : siteUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content="AIWW, Asia International Water Week, water, Manila, Philippines, 2027, MWSS, Asia Water Council, water conference" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${siteUrl}/images/aiww.png`} />
      <meta property="og:site_name" content="4th Asia International Water Week" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${siteUrl}/images/aiww.png`} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "4th Asia International Water Week (AIWW) 2027",
        "startDate": "2027-03-01",
        "endDate": "2027-03-05",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "Place",
          "name": "Philippine International Convention Center (PICC)",
          "address": { "@type": "PostalAddress", "streetAddress": "CCP Complex, Roxas Boulevard", "addressLocality": "Pasay City", "addressRegion": "Metro Manila", "postalCode": "1307", "addressCountry": "PH" }
        },
        "organizer": { "@type": "Organization", "name": "Metropolitan Waterworks and Sewerage System (MWSS)", "url": "https://www.mwss.gov.ph" },
        "description": desc,
      })}</script>
    </Helmet>
  )
}
