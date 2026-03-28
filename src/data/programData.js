export const PROGRAM_DAYS = [
  { id: 'day-1', date: '2027-03-01', label: 'Day 1 - Mon, March 1' },
  { id: 'day-2', date: '2027-03-02', label: 'Day 2 - Tue, March 2' },
  { id: 'day-3', date: '2027-03-03', label: 'Day 3 - Wed, March 3' },
  { id: 'day-4', date: '2027-03-04', label: 'Day 4 - Thu, March 4' },
  { id: 'day-5', date: '2027-03-05', label: 'Day 5 - Fri, March 5' },
]

export const THEMATIC_TRACKS = [
  { id: 'water-security', label: 'Water Security & Resilience', color: '#0066b3' },
  { id: 'climate', label: 'Climate Change Adaptation', color: '#00a86b' },
  { id: 'smart-water', label: 'Smart Water Management', color: '#7b2d8e' },
  { id: 'governance', label: 'Water Governance & Policy', color: '#d4a017' },
  { id: 'sanitation', label: 'Sanitation & Public Health', color: '#e74c3c' },
  { id: 'youth', label: 'Youth & Innovation', color: '#00bcd4' },
]

export const SESSIONS = [
  {
    id: 's1',
    day: 'day-1',
    track: null,
    type: 'plenary',
    title: 'Opening Ceremony',
    time: '09:00 - 10:30',
    venue: 'PICC Plenary Hall',
    description: 'Official opening of the 4th Asia International Water Week with welcome remarks from host country officials, Asia Water Council leadership, and distinguished guests.',
    speakers: ['sp1', 'sp2']
  },
  {
    id: 's2',
    day: 'day-1',
    track: 'water-security',
    type: 'thematic',
    title: 'Water Security in a Changing Climate',
    time: '11:00 - 12:30',
    venue: 'PICC Reception Hall A',
    description: 'Exploring strategies for ensuring water security amid increasing climate variability across Asia.',
    speakers: ['sp3']
  },
  {
    id: 's3',
    day: 'day-1',
    track: 'governance',
    type: 'thematic',
    title: 'Regional Water Governance Frameworks',
    time: '14:00 - 15:30',
    venue: 'PICC Reception Hall B',
    description: 'Comparative analysis of water governance models across Asian nations.',
    speakers: ['sp4']
  },
  {
    id: 's4',
    day: 'day-2',
    track: 'smart-water',
    type: 'thematic',
    title: 'Digital Transformation in Water Utilities',
    time: '09:00 - 10:30',
    venue: 'PICC Reception Hall A',
    description: 'IoT, AI, and big data applications for modernizing water utility operations.',
    speakers: ['sp5']
  },
  {
    id: 's5',
    day: 'day-2',
    track: 'climate',
    type: 'thematic',
    title: 'Flood Resilience and Urban Water Management',
    time: '11:00 - 12:30',
    venue: 'PICC Reception Hall B',
    description: 'Urban flood management strategies and nature-based solutions for Asian megacities.',
    speakers: ['sp6']
  },
  {
    id: 's6',
    day: 'day-2',
    track: null,
    type: 'side-event',
    title: 'Business Forum: Investment in Water Infrastructure',
    time: '14:00 - 17:00',
    venue: 'PICC Meeting Room 1',
    description: 'High-level business forum on public-private partnerships for water infrastructure development.',
    speakers: []
  },
  {
    id: 's7',
    day: 'day-3',
    track: 'youth',
    type: 'special',
    title: 'Youth & Innovation Summit',
    time: '09:00 - 12:00',
    venue: 'PICC Forum Hall',
    description: 'Showcasing young water professionals and innovative solutions from across Asia.',
    speakers: []
  },
  {
    id: 's8',
    day: 'day-3',
    track: 'sanitation',
    type: 'thematic',
    title: 'Inclusive Sanitation for All',
    time: '14:00 - 15:30',
    venue: 'PICC Reception Hall A',
    description: 'Advancing universal access to sanitation services in developing Asian countries.',
    speakers: ['sp7']
  },
  {
    id: 's9',
    day: 'day-4',
    track: null,
    type: 'plenary',
    title: 'Asia to World Statement Drafting Session',
    time: '09:00 - 12:00',
    venue: 'PICC Plenary Hall',
    description: 'Collaborative drafting of the Asia to World Statement on water challenges and action plans.',
    speakers: []
  },
  {
    id: 's10',
    day: 'day-4',
    track: null,
    type: 'plenary',
    title: 'Closing Ceremony & Declarations',
    time: '14:00 - 16:00',
    venue: 'PICC Plenary Hall',
    description: 'Presentation of the Asia to World Statement, closing declarations, and handover to next host.',
    speakers: ['sp1', 'sp2']
  },
  {
    id: 's11',
    day: 'day-5',
    track: null,
    type: 'field-trip',
    title: 'Technical Tour: Kaliwa Dam Project',
    time: '07:00 - 17:00',
    venue: 'Off-site (Quezon Province)',
    description: 'Full-day guided tour of the Kaliwa Dam construction site, a flagship water security project.',
    speakers: [],
    fee: 3000,
    capacity: 40
  },
  {
    id: 's12',
    day: 'day-5',
    track: null,
    type: 'field-trip',
    title: 'Technical Tour: La Mesa Water Treatment Plant',
    time: '08:00 - 14:00',
    venue: 'Quezon City',
    description: 'Half-day visit to one of Metro Manila\'s largest water treatment facilities.',
    speakers: [],
    fee: 2500,
    capacity: 30
  }
]

export const SPEAKERS = [
  {
    id: 'sp1',
    name: 'TBA - MWSS Administrator',
    title: 'Administrator',
    organization: 'Metropolitan Waterworks and Sewerage System',
    photo: null,
    bio: 'To be announced.'
  },
  {
    id: 'sp2',
    name: 'TBA - AWC President',
    title: 'President',
    organization: 'Asia Water Council',
    photo: null,
    bio: 'To be announced.'
  },
  {
    id: 'sp3',
    name: 'TBA - Water Security Expert',
    title: 'Senior Researcher',
    organization: 'Asian Development Bank',
    photo: null,
    bio: 'To be announced.'
  },
  {
    id: 'sp4',
    name: 'TBA - Governance Specialist',
    title: 'Director',
    organization: 'UN-Water',
    photo: null,
    bio: 'To be announced.'
  },
  {
    id: 'sp5',
    name: 'TBA - Smart Water Technologist',
    title: 'Chief Technology Officer',
    organization: 'To be confirmed',
    photo: null,
    bio: 'To be announced.'
  },
  {
    id: 'sp6',
    name: 'TBA - Climate Adaptation Expert',
    title: 'Lead Scientist',
    organization: 'To be confirmed',
    photo: null,
    bio: 'To be announced.'
  },
  {
    id: 'sp7',
    name: 'TBA - Sanitation Specialist',
    title: 'Program Manager',
    organization: 'To be confirmed',
    photo: null,
    bio: 'To be announced.'
  }
]
