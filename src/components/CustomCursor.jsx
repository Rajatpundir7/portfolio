import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Don't show on touch devices
        if ('ontouchstart' in window) return;

        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const updateCursorType = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y);
            if (hoveredElement) {
                const computedStyle = window.getComputedStyle(hoveredElement);
                setIsPointer(
                    computedStyle.cursor === 'pointer' ||
                    hoveredElement.tagName === 'A' ||
                    hoveredElement.tagName === 'BUTTON' ||
                    hoveredElement.closest('a') ||
                    hoveredElement.closest('button') ||
                    hoveredElement.classList.contains('editable')
                );
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mousemove', updateCursorType);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mousemove', updateCursorType);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [position.x, position.y]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main cursor dot */}
            <div
                className="custom-cursor-dot"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
                }}
            />
            {/* Cursor ring */}
            <div
                className="custom-cursor-ring"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
                    borderColor: isPointer ? '#ec4899' : '#8b5cf6',
                }}
            />
            {/* Cursor glow */}
            <div
                className="custom-cursor-glow"
                style={{
                    left: position.x,
                    top: position.y,
                    opacity: isPointer ? 0.6 : 0.3,
                }}
            />
        </>
    );
};

export default CustomCursor;
