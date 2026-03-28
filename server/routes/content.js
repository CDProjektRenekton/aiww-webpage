import { Router } from 'express'

const router = Router()

// CMS-like content management for dynamic pages
let content = {
  announcements: [
    { id: 1, category: 'registration', title: 'Registration Now Open for AIWW 2027', excerpt: 'Early bird registration is now open...', date: '2026-03-15', featured: true, status: 'published' },
    { id: 2, category: 'program', title: 'Call for Thematic Sessions', excerpt: 'Submit your proposals for thematic sessions...', date: '2026-03-10', featured: true, status: 'published' },
    { id: 3, category: 'sponsorship', title: 'Sponsorship Opportunities Available', excerpt: 'Explore various sponsorship packages...', date: '2026-03-05', featured: true, status: 'published' },
  ],
  program: { lastUpdated: new Date().toISOString() },
}

// GET /api/content/announcements
router.get('/announcements', (req, res) => {
  const { category, featured, search } = req.query
  let result = content.announcements.filter(a => a.status === 'published')

  if (category) result = result.filter(a => a.category === category)
  if (featured === 'true') result = result.filter(a => a.featured)
  if (search) {
    const q = search.toLowerCase()
    result = result.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
  }

  res.json({ total: result.length, announcements: result })
})

// POST /api/content/announcements - Create (admin/editor)
router.post('/announcements', (req, res) => {
  const { category, title, excerpt, featured } = req.body
  if (!title) return res.status(400).json({ error: 'Title is required' })

  const announcement = {
    id: content.announcements.length + 1,
    category: category || 'general',
    title, excerpt: excerpt || '',
    date: new Date().toISOString().split('T')[0],
    featured: featured || false,
    status: 'published',
  }

  content.announcements.unshift(announcement)
  res.status(201).json({ success: true, announcement })
})

// PATCH /api/content/announcements/:id
router.patch('/announcements/:id', (req, res) => {
  const ann = content.announcements.find(a => a.id === parseInt(req.params.id))
  if (!ann) return res.status(404).json({ error: 'Announcement not found' })

  Object.assign(ann, req.body)
  res.json({ success: true, announcement: ann })
})

// DELETE /api/content/announcements/:id
router.delete('/announcements/:id', (req, res) => {
  const index = content.announcements.findIndex(a => a.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Announcement not found' })

  content.announcements.splice(index, 1)
  res.json({ success: true })
})

export default router
