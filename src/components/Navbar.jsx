import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const closeMobile = () => setMobileOpen(false)

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container">
                <div className="navbar-inner">
                    <a href="#" className="navbar-brand">RP.</a>

                    <ul className="navbar-links">
                        {navLinks.map((l) => (
                            <li key={l.href}>
                                <a href={l.href}>{l.label}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="navbar-actions">
                        <a
                            href="https://drive.google.com/file/d/1Ey_placeholder/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary navbar-resume-btn"
                        >
                            <FiDownload /> Resume
                        </a>

                        <button
                            className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`mobile-nav ${mobileOpen ? 'active' : ''}`}>
                {navLinks.map((l) => (
                    <a key={l.href} href={l.href} onClick={closeMobile}>
                        {l.label}
                    </a>
                ))}
                <a
                    href="https://drive.google.com/file/d/1Ey_placeholder/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginTop: 16 }}
                >
                    <FiDownload /> Resume
                </a>
            </div>
        </motion.nav>
    )
}
