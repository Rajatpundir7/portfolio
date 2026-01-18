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
  const { isLoading, isSaving, saveStatus, isCloudConnected } = useContent();

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        color: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚡</div>
          <p style={{ color: '#94a3b8' }}>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="app">
        <ParticleBackground />
        <CustomCursor />

        <Navbar />
        <LoginModal />

        {isLoggedIn && (
          <div className="edit-mode-banner">
            ⚡ Edit Mode Active - Click to edit
          </div>
        )}

        {/* Saving indicator */}
        {isSaving && (
          <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            padding: '12px 20px',
            background: 'rgba(139, 92, 246, 0.95)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '500',
            zIndex: 1000,
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
          }}>
            ⏳ Saving to cloud...
          </div>
        )}

        {/* Save success */}
        {saveStatus === 'success' && !isSaving && (
          <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            padding: '12px 20px',
            background: 'rgba(16, 185, 129, 0.95)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '500',
            zIndex: 1000,
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
          }}>
            ✅ Saved! Visible to everyone
          </div>
        )}

        {/* Cloud status (edit mode only) */}
        {isLoggedIn && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 16px',
            background: isCloudConnected
              ? 'rgba(16, 185, 129, 0.2)'
              : 'rgba(249, 115, 22, 0.2)',
            border: `1px solid ${isCloudConnected ? 'rgba(16, 185, 129, 0.5)' : 'rgba(249, 115, 22, 0.5)'}`,
            borderRadius: '10px',
            color: isCloudConnected ? '#10b981' : '#f97316',
            fontSize: '0.85rem',
            fontWeight: '500',
            zIndex: 1000
          }}>
            {isCloudConnected ? '☁️ JSONBin Connected' : '💾 Local Only (Add API key)'}
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
