import { Helmet } from 'react-helmet-async'

export default function PageHeader({ title, subtitle, metaTitle }) {
  return (
    <>
      <Helmet>
        <title>{metaTitle || title} | AIWW 2027</title>
      </Helmet>
      <div className="page-header">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </>
  )
}
