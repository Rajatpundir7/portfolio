import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, openLogin, logout } = useAuth();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <a href="#" className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    RP
                </a>

                <ul className="navbar-links">
                    <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
                    <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</a></li>
                    <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
                    <li><a href="#pese" onClick={(e) => { e.preventDefault(); scrollToSection('pese'); }}>PESE Class</a></li>
                    <li><a href="#assignments" onClick={(e) => { e.preventDefault(); scrollToSection('assignments'); }}>Assignments</a></li>
                    <li><a href="#learning" onClick={(e) => { e.preventDefault(); scrollToSection('learning'); }}>Learning</a></li>
                </ul>

                <div className="navbar-actions">
                    {isLoggedIn ? (
                        <>
                            <span style={{
                                padding: '8px 16px',
                                background: 'rgba(16, 185, 129, 0.2)',
                                borderRadius: '20px',
                                color: '#10b981',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                ✏️ Edit Mode
                            </span>
                            <button className="btn btn-secondary" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={openLogin}>
                            🔐 Admin
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
