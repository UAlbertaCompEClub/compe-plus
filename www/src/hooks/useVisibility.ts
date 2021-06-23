// Credit: https://stackoverflow.com/questions/59595700/how-to-make-a-react-component-fade-in-on-scroll-using-intersectionobserver-but

import { useState, useEffect, RefObject } from 'react';

export default function useVisibility(ref: RefObject<HTMLDivElement>): boolean {
    const [isVisible, setVisibility] = useState(false);

    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisibility(true));

    useEffect(() => {
        if (ref && ref.current) {
            observer.observe(ref.current);
        }
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isVisible;
}
