import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Program from './pages/Program'
import Participation from './pages/Participation'
import Registration from './pages/Registration'
import Exhibition from './pages/Exhibition'
import Venue from './pages/Venue'
import Travel from './pages/Travel'
import News from './pages/News'
import Downloads from './pages/Downloads'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="program" element={<Program />} />
          <Route path="participation" element={<Participation />} />
          <Route path="register" element={<Registration />} />
          <Route path="exhibition" element={<Exhibition />} />
          <Route path="venue" element={<Venue />} />
          <Route path="travel" element={<Travel />} />
          <Route path="news" element={<News />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="contact" element={<Contact />} />
          <Route path="legal/:page?" element={<Legal />} />
          <Route path="admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
