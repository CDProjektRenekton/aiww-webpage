// Google Analytics integration
// Set VITE_GA_ID in .env to enable tracking

const GA_ID = import.meta.env.VITE_GA_ID

export function initAnalytics() {
  if (!GA_ID) return

  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', GA_ID, { send_page_view: false })

  window.gtag = gtag
}

export function trackPageView(path, title) {
  if (!window.gtag) return
  window.gtag('event', 'page_view', { page_path: path, page_title: title })
}

export function trackEvent(action, category, label, value) {
  if (!window.gtag) return
  window.gtag('event', action, { event_category: category, event_label: label, value })
}

export function trackRegistration(category, amount) {
  trackEvent('registration', 'conversion', category, amount)
}

export function trackPayment(method, amount) {
  trackEvent('payment', 'conversion', method, amount)
}
