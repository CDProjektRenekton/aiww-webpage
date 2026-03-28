import { Router } from 'express'

const router = Router()

// GET /api/admin/dashboard - Dashboard stats
router.get('/dashboard', (req, res) => {
  // TODO: Pull from actual database
  res.json({
    totalRegistrations: 0,
    totalRevenue: 0,
    totalExhibitors: 0,
    paymentBreakdown: { paid: 0, pending: 0, failed: 0, refunded: 0 },
    categoryBreakdown: {},
    recentRegistrations: [],
  })
})

// GET /api/admin/export/:type - Export data
router.get('/export/:type', (req, res) => {
  const { type } = req.params
  const validTypes = ['registrations', 'payments', 'addons', 'badges']

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid export type' })
  }

  // TODO: Generate actual CSV/Excel export
  res.json({ message: `Export type '${type}' - CSV generation will be implemented with json2csv or exceljs` })
})

// POST /api/admin/broadcast - Email broadcast
router.post('/broadcast', (req, res) => {
  const { recipients, subject, message } = req.body

  if (!subject || !message) {
    return res.status(400).json({ error: 'Subject and message are required' })
  }

  // TODO: Integrate with email service (SendGrid, AWS SES, or Nodemailer)
  res.json({
    success: true,
    message: `Email broadcast queued for ${recipients || 'all'} recipients`,
    note: 'Email service integration (SendGrid/AWS SES) to be configured with production credentials'
  })
})

export default router
