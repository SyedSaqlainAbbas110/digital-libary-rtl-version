import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function LottieAnimation({ animationData, loop = true, autoplay = true, className = "" }) {
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && animationData) {
            animationRef.current = lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop,
                autoplay,
                animationData,
            });

            return () => {
                animationRef.current?.destroy();
            };
        }
    }, [animationData, loop, autoplay]);

    return <div ref={containerRef} className={className} />;
}
