export const PARTICIPANT_CATEGORIES = [
  { id: 'early-bird', label: 'Early Bird', fee: 15000, currency: 'PHP', deadline: '2027-01-31' },
  { id: 'regular', label: 'Regular', fee: 20000, currency: 'PHP', deadline: '2027-02-28' },
  { id: 'student', label: 'Student', fee: 8000, currency: 'PHP', deadline: null },
  { id: 'government', label: 'Government', fee: 12000, currency: 'PHP', deadline: null },
  { id: 'international', label: 'International', fee: 25000, currency: 'PHP', deadline: null },
  { id: 'local', label: 'Local', fee: 15000, currency: 'PHP', deadline: null },
]

export const ADD_ONS = [
  { id: 'gala-dinner', label: 'Gala Dinner', fee: 5000, capacity: 500 },
  { id: 'field-trip-a', label: 'Field Trip A - Kaliwa Dam', fee: 3000, capacity: 40 },
  { id: 'field-trip-b', label: 'Field Trip B - Angat Dam', fee: 3000, capacity: 40 },
  { id: 'field-trip-c', label: 'Field Trip C - La Mesa Treatment Plant', fee: 2500, capacity: 30 },
  { id: 'workshop-1', label: 'Workshop: Smart Water Management', fee: 2000, capacity: 50 },
  { id: 'workshop-2', label: 'Workshop: Climate Resilient Infrastructure', fee: 2000, capacity: 50 },
]

export const PAYMENT_METHODS = [
  { id: 'credit-card', label: 'Credit Card (Visa/Mastercard)', icon: 'FaCreditCard' },
  { id: 'gcash', label: 'GCash', icon: 'FaMobileAlt' },
  { id: 'alipay', label: 'AliPay', icon: 'FaAlipay' },
  { id: 'wechat', label: 'WeChat Pay', icon: 'FaWeixin' },
  { id: 'bank-transfer', label: 'Bank Transfer', icon: 'FaUniversity' },
]

export const REFUND_POLICY = [
  { deadline: '2027-01-31', refundPercent: 100, label: 'Full refund' },
  { deadline: '2027-02-15', refundPercent: 75, label: '75% refund (25% admin fee)' },
  { deadline: '2027-02-28', refundPercent: 50, label: '50% refund' },
  { deadline: null, refundPercent: 0, label: 'No refund after Feb 28, 2027' },
]

export const COUNTRIES = [
  'Afghanistan','Australia','Bangladesh','Bhutan','Brunei','Cambodia','China',
  'Fiji','India','Indonesia','Japan','Kazakhstan','Kiribati','Korea (South)',
  'Kyrgyzstan','Laos','Malaysia','Maldives','Marshall Islands','Micronesia',
  'Mongolia','Myanmar','Nauru','Nepal','New Zealand','Pakistan','Palau',
  'Papua New Guinea','Philippines','Samoa','Singapore','Solomon Islands',
  'Sri Lanka','Tajikistan','Thailand','Timor-Leste','Tonga','Turkmenistan',
  'Tuvalu','Uzbekistan','Vanuatu','Vietnam','Other'
]
