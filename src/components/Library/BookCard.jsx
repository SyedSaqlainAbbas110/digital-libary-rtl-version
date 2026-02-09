import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';

export default function BookCard({ book, index }) {
    const { getBookProgress, lastRead } = useAppStore();
    const progress = getBookProgress(book.bookId);
    const isLastRead = lastRead?.bookId === book.bookId;

    const gradientClasses = {
        gold: 'from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 border-[var(--color-gold)]/30',
        teal: 'from-[var(--color-teal)]/20 to-[var(--color-teal)]/5 border-[var(--color-teal)]/30',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Link
                to={`/book/${book.bookId}/chapter/1`}
                className={`
          block glass-card p-6 rounded-2xl relative overflow-hidden
          transition-all duration-300
          hover:shadow-2xl hover:shadow-[var(--color-gold)]/10
          bg-gradient-to-br ${gradientClasses[book.coverColor] || gradientClasses.gold}
        `}
            >
                {/* Last read indicator */}
                {isLastRead && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[var(--color-teal)] text-[var(--color-bg-primary)] text-xs font-semibold">
                        جاری مطالعہ
                    </div>
                )}

                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 pattern-arabesque opacity-30"></div>

                {/* Book cover visualization */}
                <div className="relative mb-4">
                    <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] flex items-center justify-center overflow-hidden border border-[var(--glass-border)]">
                        <div className="text-center px-4">
                            <span className="font-arabic-heading text-5xl text-gold opacity-60 block mb-4">❋</span>
                            <h3 className="font-urdu text-xl text-gold leading-relaxed">
                                {book.title_ur}
                            </h3>
                            {book.subtitle_ur && (
                                <p className="font-urdu text-sm text-[var(--color-text-secondary)] mt-2">
                                    {book.subtitle_ur}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Progress indicator */}
                    {progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-bg-tertiary)]">
                            <motion.div
                                className="h-full bg-gradient-gold-teal"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Book info */}
                <div className="relative">
                    <p className="font-urdu text-sm text-[var(--color-text-secondary)]">
                        {book.author_ur}
                    </p>

                    {progress > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1 bg-[var(--color-bg-tertiary)] rounded-full">
                                <div
                                    className="h-full bg-teal rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-teal">{progress}%</span>
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
