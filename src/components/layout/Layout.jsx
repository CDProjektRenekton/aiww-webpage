import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import SplashScreen from './SplashScreen'
import WaterBackground from './WaterBackground'

function getSplashShown() {
  try {
    return !!sessionStorage.getItem('splashShown')
  } catch {
    return false
  }
}

function setSplashShown() {
  try {
    sessionStorage.setItem('splashShown', 'true')
  } catch {
    // sessionStorage unavailable (sandbox/incognito)
  }
}

export default function Layout() {
  const [showSplash, setShowSplash] = useState(() => !getSplashShown())
  const location = useLocation()

  useEffect(() => {
    if (!showSplash) return
    const timer = setTimeout(() => {
      setShowSplash(false)
      setSplashShown()
    }, 1800)
    return () => clearTimeout(timer)
  }, [showSplash])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // If splash was already shown, render content immediately with no transition
  if (!showSplash) {
    return (
      <>
        <WaterBackground />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    )
  }

  // First visit: show splash, then fade in content
  return (
    <>
      <SplashScreen visible={showSplash} />
      <div style={{ opacity: 0, visibility: 'hidden' }}>
        <WaterBackground />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
