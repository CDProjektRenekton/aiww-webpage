import { create } from 'zustand'

export const useRegistrationStore = create((set, get) => ({
  step: 1,
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    designation: '',
    country: '',
    phone: '',
    category: 'regular',
    addOns: [],
  },
  totalFee: 0,
  paymentStatus: null,

  setStep: (step) => set({ step }),
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  setTotalFee: (fee) => set({ totalFee: fee }),
  setPaymentStatus: (status) => set({ paymentStatus: status }),
  reset: () => set({
    step: 1,
    formData: {
      firstName: '', lastName: '', email: '', organization: '',
      designation: '', country: '', phone: '', category: 'regular', addOns: [],
    },
    totalFee: 0,
    paymentStatus: null,
  }),
}))

export const useContentStore = create((set) => ({
  announcements: [],
  program: { days: [], sessions: [], speakers: [] },
  sponsors: [],
  setAnnouncements: (announcements) => set({ announcements }),
  setProgram: (program) => set({ program }),
  setSponsors: (sponsors) => set({ sponsors }),
}))

export const useAdminStore = create((set) => ({
  registrations: [],
  payments: [],
  stats: { total: 0, paid: 0, unpaid: 0, revenue: 0 },
  setRegistrations: (registrations) => set({ registrations }),
  setPayments: (payments) => set({ payments }),
  setStats: (stats) => set({ stats }),
}))
