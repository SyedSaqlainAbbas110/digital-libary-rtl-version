import { motion } from 'framer-motion';
import useAppStore from '../../../store/useAppStore';

export default function UrduProse({ text, index }) {
    const { fontSize } = useAppStore();

    const fontSizeClasses = {
        small: 'text-base leading-[2.4]',
        medium: 'text-lg leading-[2.6]',
        large: 'text-xl leading-[2.8]'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="content-block urdu-prose my-4"
            data-content-index={index}
        >
            <p className={`
        font-urdu text-[var(--color-text-primary)]
        ${fontSizeClasses[fontSize]}
      `}>
                {text}
            </p>
        </motion.div>
    );
}
