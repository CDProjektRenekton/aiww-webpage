// CAPTCHA validation middleware
export function validateCaptcha(req, res, next) {
  // In production, integrate with Google reCAPTCHA v3 or hCaptcha
  // For now, check for captcha token in request
  const captchaToken = req.body.captchaToken || req.headers['x-captcha-token']

  if (process.env.NODE_ENV === 'production' && !captchaToken) {
    return res.status(400).json({ error: 'CAPTCHA verification required' })
  }

  // TODO: Verify token with Google reCAPTCHA API
  // const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  //   method: 'POST',
  //   body: `secret=${RECAPTCHA_SECRET}&response=${captchaToken}`,
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  // })

  next()
}

// Registration data validation
export function validateRegistration(req, res, next) {
  const { firstName, lastName, email, organization, country, category } = req.body
  const errors = []

  if (!firstName?.trim()) errors.push('First name is required')
  if (!lastName?.trim()) errors.push('Last name is required')
  if (!email?.trim()) errors.push('Email is required')
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email format')
  if (!organization?.trim()) errors.push('Organization is required')
  if (!country?.trim()) errors.push('Country is required')

  const validCategories = ['early-bird', 'regular', 'student', 'government', 'international', 'local']
  if (category && !validCategories.includes(category)) errors.push('Invalid registration category')

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors })
  }

  // Sanitize inputs
  req.body.firstName = firstName.trim()
  req.body.lastName = lastName.trim()
  req.body.email = email.trim().toLowerCase()
  req.body.organization = organization.trim()
  req.body.country = country.trim()

  next()
}

// Admin authentication middleware
export function requireAdmin(req, res, next) {
  // TODO: Implement JWT or session-based authentication
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  // TODO: Verify JWT token and check role
  // const decoded = jwt.verify(token, process.env.JWT_SECRET)
  // if (!['admin', 'editor'].includes(decoded.role)) {
  //   return res.status(403).json({ error: 'Insufficient permissions' })
  // }

  next()
}
