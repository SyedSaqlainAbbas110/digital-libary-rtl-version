import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AuthorCard3D({ name, role, image }) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-sm h-96 rounded-xl bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border border-[var(--color-gold)]/30 backdrop-blur-sm shadow-2xl"
        >
            <div
                style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
                className="absolute inset-4 flex flex-col items-center justify-center text-center"
            >
                {/* Author Image/Avatar */}
                <div className="w-32 h-32 rounded-full bg-gradient-gold-teal p-1 mb-6 shadow-lg">
                    <div className="w-full h-full rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center overflow-hidden">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-arabic-heading text-6xl text-gold">م</span>
                        )}
                    </div>
                </div>

                <h2 className="font-urdu text-3xl text-gold mb-2 drop-shadow-md">{name}</h2>
                <p className="font-urdu text-lg text-[var(--color-text-secondary)]">{role}</p>

                <div className="mt-6 flex gap-3">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-teal)]/30 text-xs text-teal font-urdu">
                        ۵۰+ تالیفات
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-gold)]/30 text-xs text-gold font-urdu">
                        ۲۰+ سالہ خدمات
                    </span>
                </div>
            </div>

            {/* Reflection effect */}
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-xl pointer-events-none"
            />
        </motion.div>
    );
}
