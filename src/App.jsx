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

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="app">
      <Navbar />
      <LoginModal />

      {/* Edit Mode Banner */}
      {isLoggedIn && (
        <div className="edit-mode-banner">
          ✏️ Edit Mode Active - Click any text/media to edit
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
  )
}

export default App
