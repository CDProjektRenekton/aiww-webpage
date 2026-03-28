export default function SplashScreen({ visible }) {
  return (
    <div className={`splash-overlay${visible ? '' : ' hidden'}`}>
      <div className="splash-logo">
        <img src="/images/logo.png" alt="MWSS Logo" />
      </div>
    </div>
  )
}
