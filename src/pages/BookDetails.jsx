import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import booksData from '../data/books.json';

export default function BookDetails() {
    const { bookId } = useParams();
    const book = booksData.find(b => b.bookId === bookId);

    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-urdu text-gold">کتاب نہیں ملی</h2>
                <Link to="/" className="mt-4 text-teal hover:underline flex items-center gap-2">
                    <ArrowRight size={16} /> واپس جائیں
                </Link>
            </div>
        );
    }

    // Calculate estimated reading time (rough)
    const totalWords = book.chapters.reduce((acc, chap) => {
        return acc + chap.content.reduce((cAcc, blk) => cAcc + (blk.text?.length || 0), 0);
    }, 0);
    const readingTime = Math.ceil(totalWords / 200); // 200 chars per min approx

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-full p-4 lg:p-8 pb-24"
        >
            {/* Header / Cover Area */}
            <div className="glass-card-gold p-6 lg:p-10 rounded-3xl relative overflow-hidden mb-8">
                <div className="absolute inset-0 pattern-arabesque opacity-30"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-right">
                    {/* Cover Placeholder */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`w-32 h-48 md:w-48 md:h-64 rounded-xl shadow-2xl flex items-center justify-center shrink-0 border-2 border-white/10 bg-gradient-to-br ${book.cover_style === 'gold-teal' ? 'from-amber-700 to-teal-900' :
                                book.cover_style === 'teal-silver' ? 'from-teal-800 to-slate-800' :
                                    book.cover_style === 'dark-gold' ? 'from-slate-900 to-amber-900' :
                                        book.cover_style === 'blue-silver' ? 'from-blue-900 to-slate-800' :
                                            'from-emerald-900 to-amber-900'
                            }`}
                    >
                        <span className="font-arabic-heading text-6xl text-white/80 drop-shadow-lg">{book.title_ur.charAt(0)}</span>
                    </motion.div>

                    <div className="flex-1">
                        <Link to="/" className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-gold mb-4 transition-colors">
                            <ArrowRight size={16} /> لائبریری
                        </Link>

                        <h1 className="font-urdu text-3xl md:text-5xl text-gold mb-2 leading-tight">{book.title_ur}</h1>
                        <h2 className="font-sans text-lg text-[var(--color-text-secondary)] mb-6">{book.title_en}</h2>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                            <div className="flex items-center gap-2 bg-[var(--color-bg-primary)]/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-[var(--glass-border)]">
                                <span className="text-teal font-urdu">مصنف:</span>
                                <span className="text-[var(--color-text-primary)] font-urdu">{book.author_ur}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-[var(--color-bg-primary)]/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-[var(--glass-border)]">
                                <Clock size={16} className="text-gold" />
                                <span className="text-[var(--color-text-primary)] font-sans text-sm">{readingTime} mins</span>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center md:justify-start">
                            <Link
                                to={`/book/${bookId}/chapter/1`}
                                className="px-8 py-3 rounded-xl bg-gradient-gold-teal text-[var(--color-bg-primary)] font-bold font-urdu hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-teal-900/20"
                            >
                                <BookOpen size={20} /> مطالعہ شروع کریں
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chapters List */}
            <div className="max-w-4xl mx-auto">
                <h3 className="font-urdu text-2xl text-[var(--color-text-primary)] mb-6 pr-2 border-r-4 border-gold">فہرست ابواب</h3>

                <div className="grid gap-4">
                    {book.chapters.map((chapter, index) => (
                        <Link key={chapter.chapterId} to={`/book/${bookId}/chapter/${chapter.chapterId}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card p-4 rounded-xl flex items-center gap-4 hover:bg-[var(--color-bg-secondary)] hover:border-gold/30 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center font-bold text-teal group-hover:bg-gold group-hover:text-[var(--color-bg-primary)] transition-colors">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-urdu text-lg text-[var(--color-text-primary)] group-hover:text-gold transition-colors">{chapter.title_ur}</h4>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-teal">
                                    <ArrowRight size={20} className="rotate-180" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
