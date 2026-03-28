import { Router } from 'express'
import { validateCaptcha } from '../middleware/validation.js'

const router = Router()

let messages = []

// POST /api/contact - Submit contact form
router.post('/', validateCaptcha, (req, res) => {
  try {
    const { type, name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const validTypes = ['general', 'registration', 'sponsorship', 'program', 'media']
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid inquiry type' })
    }

    const contactMessage = {
      id: `MSG-${Date.now().toString(36).toUpperCase()}`,
      type: type || 'general',
      name, email, subject, message,
      status: 'unread',
      createdAt: new Date().toISOString(),
    }

    messages.push(contactMessage)

    // TODO: Route to appropriate team based on type
    // TODO: Send auto-acknowledgment email

    res.status(201).json({ success: true, messageId: contactMessage.id })
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit message' })
  }
})

// GET /api/contact - List messages (admin)
router.get('/', (req, res) => {
  res.json({ total: messages.length, messages })
})

export default router
