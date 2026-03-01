import { FiGithub, FiLinkedin, FiCode, FiHeart } from 'react-icons/fi'

const socials = [
    { icon: <FiGithub />, href: 'https://github.com/Rajatpundir07' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/rajat-pundir-b7556b298' },
    { icon: <FiCode />, href: 'https://leetcode.com/rajatpundir07' },
]

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p>
                        © {new Date().getFullYear()} Rajat Pundir. Built with <FiHeart style={{ verticalAlign: 'middle', color: '#f43f5e' }} /> & React
                    </p>
                    <div className="footer-socials">
                        {socials.map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
