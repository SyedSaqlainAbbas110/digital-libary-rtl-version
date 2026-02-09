import { motion } from 'framer-motion';
import useAppStore from '../../../store/useAppStore';

export default function CalligraphyBox({ text, reference, index }) {
    const { fontSize } = useAppStore();

    const fontSizeClasses = {
        small: 'text-xl',
        medium: 'text-2xl',
        large: 'text-3xl'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
            className="content-block calligraphy-box my-8"
            data-content-index={index}
        >
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-gold)] opacity-50 rounded-tr-lg"></div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-gold)] opacity-50 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-teal)] opacity-50 rounded-br-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-teal)] opacity-50 rounded-bl-lg"></div>

            {/* Arabic verse text */}
            <p className={`
        verse-text font-arabic text-[var(--color-manuscript)]
        ${fontSizeClasses[fontSize]}
        select-all
      `}>
                {text}
            </p>

            {/* Reference */}
            {reference && (
                <motion.p
                    className="verse-reference mt-3 font-urdu text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-[var(--color-gold)] opacity-80">— {reference}</span>
                </motion.p>
            )}

            {/* Subtle glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-gold)]/5 to-transparent rounded-xl blur-xl"></div>
        </motion.div>
    );
}
