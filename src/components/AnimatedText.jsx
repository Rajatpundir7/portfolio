import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const TypewriterText = ({ strings, className = '', style = {} }) => {
    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        typed.current = new Typed(el.current, {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
            smartBackspace: true,
        });

        return () => {
            typed.current.destroy();
        };
    }, [strings]);

    return (
        <span className={`typewriter-text ${className}`} style={style}>
            <span ref={el}></span>
        </span>
    );
};

// Animated gradient text component
const GradientText = ({ children, className = '', animate = true }) => {
    return (
        <span
            className={`gradient-text ${animate ? 'gradient-animate' : ''} ${className}`}
        >
            {children}
        </span>
    );
};

// Glowing text component
const GlowText = ({ children, color = 'primary', className = '' }) => {
    const colors = {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        accent: '#ec4899',
        success: '#10b981',
    };

    return (
        <span
            className={`glow-text ${className}`}
            style={{
                textShadow: `0 0 10px ${colors[color]}40, 0 0 20px ${colors[color]}30, 0 0 40px ${colors[color]}20`,
                color: colors[color],
            }}
        >
            {children}
        </span>
    );
};

// Floating animation wrapper
const FloatingElement = ({ children, delay = 0, duration = 3 }) => {
    return (
        <div
            className="floating-element"
            style={{
                animation: `float ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

// Reveal on scroll animation
const RevealOnScroll = ({ children, direction = 'up', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const getTransform = () => {
        switch (direction) {
            case 'up': return 'translateY(50px)';
            case 'down': return 'translateY(-50px)';
            case 'left': return 'translateX(50px)';
            case 'right': return 'translateX(-50px)';
            default: return 'translateY(50px)';
        }
    };

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : getTransform(),
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

export { TypewriterText, GradientText, GlowText, FloatingElement, RevealOnScroll };
