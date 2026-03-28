const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  }

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
  }

  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`)
  }

  return data
}

export const api = {
  // Registration
  createRegistration: (data) => request('/registration', { method: 'POST', body: data }),
  getRegistration: (id) => request(`/registration/${id}`),
  listRegistrations: (params) => request(`/registration?${new URLSearchParams(params)}`),
  updateRegistrationStatus: (id, status) => request(`/registration/${id}/status`, { method: 'PATCH', body: { status } }),

  // Payment
  processPayment: (data) => request('/payment', { method: 'POST', body: data }),
  getPayment: (id) => request(`/payment/${id}`),
  getPaymentStats: () => request('/payment/summary/stats'),

  // Contact
  submitContact: (data) => request('/contact', { method: 'POST', body: data }),

  // Content
  getAnnouncements: (params) => request(`/content/announcements?${new URLSearchParams(params || {})}`),
  createAnnouncement: (data) => request('/content/announcements', { method: 'POST', body: data }),

  // Admin
  getDashboard: () => request('/admin/dashboard'),
  exportData: (type) => request(`/admin/export/${type}`),
  sendBroadcast: (data) => request('/admin/broadcast', { method: 'POST', body: data }),

  // Health
  healthCheck: () => request('/health'),
}

export default api
