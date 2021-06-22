import React, { useState, useEffect, RefObject } from 'react';

export default function useVisibility(ref: RefObject<HTMLDivElement>): boolean {
    const [isIntersecting, setIntersecting] = useState(false);

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

    useEffect(() => {
        if (ref && ref.current) {
            observer.observe(ref.current);
        }
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
}
