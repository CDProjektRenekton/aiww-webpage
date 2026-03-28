export const SPONSORSHIP_TIERS = [
  {
    id: 'platinum',
    name: 'Platinum',
    price: 2000000,
    currency: 'PHP',
    color: '#e5e4e2',
    benefits: [
      'Premium booth location (36 sqm)',
      'Logo on all event materials and website homepage',
      '10 complimentary registrations',
      'Speaking slot at opening/closing ceremony',
      'Full-page ad in event program booklet',
      'VIP access to all networking events',
      'Dedicated press mention',
      'Banner placement at plenary hall',
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 1000000,
    currency: 'PHP',
    color: '#FFD700',
    benefits: [
      'Premium booth location (18 sqm)',
      'Logo on event materials and website',
      '5 complimentary registrations',
      'Half-page ad in event program booklet',
      'Access to VIP networking events',
      'Banner placement in session halls',
    ]
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 500000,
    currency: 'PHP',
    color: '#C0C0C0',
    benefits: [
      'Standard booth (9 sqm)',
      'Logo on website sponsors page',
      '3 complimentary registrations',
      'Quarter-page ad in program booklet',
      'Access to networking lunches',
    ]
  },
  {
    id: 'bronze',
    name: 'Bronze',
    price: 250000,
    currency: 'PHP',
    color: '#CD7F32',
    benefits: [
      'Table-top display space',
      'Logo on website sponsors page',
      '2 complimentary registrations',
      'Listing in program booklet',
    ]
  }
]

export const EXHIBITOR_PACKAGES = [
  {
    id: 'premium-booth',
    name: 'Premium Booth',
    size: '36 sqm',
    price: 500000,
    inclusions: ['Shell scheme', 'Electricity', 'Wi-Fi', '4 exhibitor passes', 'Premium corner location']
  },
  {
    id: 'standard-booth',
    name: 'Standard Booth',
    size: '18 sqm',
    price: 300000,
    inclusions: ['Shell scheme', 'Electricity', 'Wi-Fi', '2 exhibitor passes']
  },
  {
    id: 'basic-booth',
    name: 'Basic Booth',
    size: '9 sqm',
    price: 150000,
    inclusions: ['Shell scheme', 'Electricity', '1 exhibitor pass']
  },
  {
    id: 'table-top',
    name: 'Table-Top Display',
    size: '2 sqm',
    price: 50000,
    inclusions: ['Table + 2 chairs', 'Electricity', '1 exhibitor pass']
  }
]
