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
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'

function App() {
  const { isLoggedIn } = useAuth();

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
