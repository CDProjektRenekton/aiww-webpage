import { Router } from 'express'
import { validateRegistration, validateCaptcha } from '../middleware/validation.js'

const router = Router()

// In-memory store (replace with database in production)
let registrations = []
let nextId = 1

// POST /api/registration - Create new registration
router.post('/', validateCaptcha, validateRegistration, (req, res) => {
  try {
    const { firstName, lastName, email, organization, designation, country, phone, category, addOns } = req.body

    // Check duplicate email
    if (registrations.find(r => r.email === email)) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    const registration = {
      id: `AIWW27-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      firstName, lastName, email, organization, designation, country, phone,
      category, addOns: addOns || [],
      status: 'pending',
      paymentStatus: 'pending',
      amount: 0, // Calculated by fee engine
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    registrations.push(registration)

    // TODO: Send confirmation email
    // TODO: Calculate fees based on category + addons

    res.status(201).json({
      success: true,
      registration: { id: registration.id, email: registration.email, status: registration.status }
    })
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

// GET /api/registration/:id - Get registration by ID
router.get('/:id', (req, res) => {
  const reg = registrations.find(r => r.id === req.params.id)
  if (!reg) return res.status(404).json({ error: 'Registration not found' })
  res.json(reg)
})

// GET /api/registration - List all (admin only in production)
router.get('/', (req, res) => {
  const { status, category, search } = req.query
  let result = [...registrations]

  if (status) result = result.filter(r => r.paymentStatus === status)
  if (category) result = result.filter(r => r.category === category)
  if (search) {
    const q = search.toLowerCase()
    result = result.filter(r =>
      r.firstName.toLowerCase().includes(q) ||
      r.lastName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    )
  }

  res.json({ total: result.length, registrations: result })
})

// PATCH /api/registration/:id/status - Update status (admin)
router.patch('/:id/status', (req, res) => {
  const reg = registrations.find(r => r.id === req.params.id)
  if (!reg) return res.status(404).json({ error: 'Registration not found' })

  const { status } = req.body
  const validStatuses = ['pending', 'paid', 'failed', 'refunded', 'cancelled']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  reg.paymentStatus = status
  reg.updatedAt = new Date().toISOString()

  res.json({ success: true, registration: reg })
})

export default router
