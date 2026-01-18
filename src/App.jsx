import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'
import Hero from './components/Hero'
import About from './components/About'
import { Skills, Projects, Education } from './components/Resume'
import PESEBranch from './components/PESEBranch'
import Assignments from './components/Assignments'
import WeeklyLearning from './components/WeeklyLearning'
import Footer from './components/Footer'
import { useAuth } from './context/AuthContext'
import { useContent } from './context/ContentContext'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'

function App() {
  const { isLoggedIn } = useAuth();
  const { isLoading, isSaving, saveStatus, isFirebaseConnected } = useContent();

  // Show loading screen while content loads
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-dark)',
        color: 'var(--text-primary)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px',
            animation: 'pulse 1.5s infinite'
          }}>
            ⚡
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="app">
        {/* Particle Background */}
        <ParticleBackground />

        {/* Custom Cursor */}
        <CustomCursor />

        <Navbar />
        <LoginModal />

        {/* Edit Mode Banner */}
        {isLoggedIn && (
          <div className="edit-mode-banner">
            ⚡ Edit Mode Active - Click to edit
          </div>
        )}

        {/* Save Status Indicator */}
        {isSaving && (
          <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            padding: '12px 20px',
            background: 'rgba(139, 92, 246, 0.9)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '500',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: 'var(--shadow-glow-purple)'
          }}>
            <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
            Saving to cloud...
          </div>
        )}

        {/* Save Success Indicator */}
        {saveStatus === 'success' && !isSaving && (
          <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            padding: '12px 20px',
            background: 'rgba(16, 185, 129, 0.9)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '500',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
          }}>
            ✅ Saved! Changes visible to everyone
          </div>
        )}

        {/* Firebase Connection Status (shown only in edit mode) */}
        {isLoggedIn && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 16px',
            background: isFirebaseConnected
              ? 'rgba(16, 185, 129, 0.2)'
              : 'rgba(249, 115, 22, 0.2)',
            border: `1px solid ${isFirebaseConnected ? 'rgba(16, 185, 129, 0.5)' : 'rgba(249, 115, 22, 0.5)'}`,
            borderRadius: '10px',
            color: isFirebaseConnected ? '#10b981' : '#f97316',
            fontSize: '0.85rem',
            fontWeight: '500',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {isFirebaseConnected ? '☁️ Cloud Connected' : '💾 Local Storage Only'}
          </div>
        )}

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <PESEBranch />
          <Assignments />
          <WeeklyLearning />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
