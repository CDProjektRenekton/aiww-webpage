import { Router } from 'express'

const router = Router()

let payments = []

// POST /api/payment - Process payment
router.post('/', (req, res) => {
  try {
    const { registrationId, method, amount, currency } = req.body

    if (!registrationId || !method || !amount) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const validMethods = ['credit-card', 'gcash', 'alipay', 'wechat', 'bank-transfer']
    if (!validMethods.includes(method)) {
      return res.status(400).json({ error: 'Invalid payment method' })
    }

    // Simulate payment processing
    const payment = {
      id: `PAY-${Date.now().toString(36).toUpperCase()}`,
      registrationId,
      method,
      amount,
      currency: currency || 'PHP',
      status: 'paid', // Simulated success
      transactionRef: `TXN${Date.now()}`,
      processedAt: new Date().toISOString(),
    }

    payments.push(payment)

    // TODO: Integrate with actual payment gateways (Stripe, PayMongo for GCash, AliPay SDK, WeChat Pay SDK)
    // TODO: Generate PDF receipt with QR code
    // TODO: Send payment confirmation email

    res.status(201).json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        transactionRef: payment.transactionRef,
        receiptUrl: `/api/payment/${payment.id}/receipt`,
      }
    })
  } catch (err) {
    res.status(500).json({ error: 'Payment processing failed' })
  }
})

// GET /api/payment/:id - Get payment details
router.get('/:id', (req, res) => {
  const payment = payments.find(p => p.id === req.params.id)
  if (!payment) return res.status(404).json({ error: 'Payment not found' })
  res.json(payment)
})

// GET /api/payment/:id/receipt - Download receipt (PDF)
router.get('/:id/receipt', (req, res) => {
  const payment = payments.find(p => p.id === req.params.id)
  if (!payment) return res.status(404).json({ error: 'Payment not found' })

  // TODO: Generate actual PDF receipt with QR code using pdfkit or similar
  res.json({
    type: 'receipt',
    payment: payment,
    qrData: JSON.stringify({ paymentId: payment.id, registrationId: payment.registrationId, amount: payment.amount }),
    message: 'PDF receipt generation will be implemented with pdfkit + qrcode libraries',
  })
})

// GET /api/payment/summary/stats - Payment summary for dashboard
router.get('/summary/stats', (req, res) => {
  const paid = payments.filter(p => p.status === 'paid')
  const totalRevenue = paid.reduce((sum, p) => sum + p.amount, 0)

  res.json({
    totalPayments: payments.length,
    totalRevenue,
    byMethod: {
      'credit-card': paid.filter(p => p.method === 'credit-card').length,
      'gcash': paid.filter(p => p.method === 'gcash').length,
      'alipay': paid.filter(p => p.method === 'alipay').length,
      'wechat': paid.filter(p => p.method === 'wechat').length,
      'bank-transfer': paid.filter(p => p.method === 'bank-transfer').length,
    },
    byStatus: {
      paid: paid.length,
      pending: payments.filter(p => p.status === 'pending').length,
      failed: payments.filter(p => p.status === 'failed').length,
      refunded: payments.filter(p => p.status === 'refunded').length,
    }
  })
})

export default router
