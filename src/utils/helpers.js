export function formatCurrency(amount, currency = 'PHP') {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getCountdown(targetDate) {
  const now = new Date().getTime()
  const target = new Date(targetDate).getTime()
  const distance = target - now

  if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  }
}

export function animateCounter(target, duration, callback) {
  const steps = 60
  const interval = duration / steps
  let currentStep = 0

  const counter = setInterval(() => {
    currentStep++
    const progress = Math.min(1, currentStep / steps)
    const eased = 1 - Math.pow(1 - progress, 3)
    callback(Math.floor(eased * target))
    if (currentStep >= steps) {
      clearInterval(counter)
      callback(target)
    }
  }, interval)

  return counter
}

export function generateRegistrationId() {
  const prefix = 'AIWW27'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function calculateFees(category, addOns, categories, addOnList) {
  const cat = categories.find(c => c.id === category)
  const baseFee = cat ? cat.fee : 0
  const addOnFees = addOns.reduce((sum, id) => {
    const addon = addOnList.find(a => a.id === id)
    return sum + (addon ? addon.fee : 0)
  }, 0)
  return { baseFee, addOnFees, total: baseFee + addOnFees }
}

export function exportToCSV(data, filename) {
  if (!data.length) return
  const headers = Object.keys(data[0])
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
