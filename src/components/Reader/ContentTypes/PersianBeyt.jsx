import { motion } from 'framer-motion';
import useAppStore from '../../../store/useAppStore';

export default function PersianBeyt({ text, lines, index }) {
    const { fontSize } = useAppStore();

    const fontSizeClasses = {
        small: 'text-lg',
        medium: 'text-xl',
        large: 'text-2xl'
    };

    // Handle both 'text' (string) and 'lines' (array) formats
    const misras = lines || (text ? text.split('\n').filter(line => line.trim()) : []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 150 }}
            className="content-block persian-beyt my-8 py-6 relative"
            data-content-index={index}
        >
            {/* Decorative lines */}
            <div className="absolute top-0 right-[20%] left-[20%] h-px bg-gradient-to-r from-transparent via-[var(--color-teal)] to-transparent opacity-50"></div>
            <div className="absolute bottom-0 right-[20%] left-[20%] h-px bg-gradient-to-r from-transparent via-[var(--color-teal)] to-transparent opacity-50"></div>

            {/* Poetry container */}
            <div className="text-center px-4">
                {misras.map((misra, idx) => (
                    <motion.span
                        key={idx}
                        className={`
              misra font-persian text-[var(--color-text-primary)] block
              ${fontSizeClasses[fontSize]}
            `}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.05) + (idx * 0.1) }}
                    >
                        {misra}
                    </motion.span>
                ))}
            </div>

            {/* Decorative diamond */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[var(--color-teal)] opacity-50"></div>

            {/* Subtle glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-teal)]/5 via-transparent to-[var(--color-teal)]/5 rounded-xl"></div>
        </motion.div>
    );
}
