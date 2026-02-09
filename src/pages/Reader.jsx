import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SmartReader from '../components/Reader/SmartReader';
import booksData from '../data/books.json';

export default function Reader() {
    const { bookId, chapterId } = useParams();

    // Find the book
    const book = booksData.find(b => b.bookId === bookId);

    if (!book) {
        return <Navigate to="/" replace />;
    }

    const chapterNum = parseInt(chapterId);
    const chapter = book.chapters.find(c => c.chapterId === chapterNum);

    if (!chapter) {
        return <Navigate to={`/book/${bookId}`} replace />;
    }

    // Find previous/next chapters
    const currentIndex = book.chapters.findIndex(c => c.chapterId === chapterNum);
    const prevChapter = currentIndex > 0 ? book.chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < book.chapters.length - 1 ? book.chapters[currentIndex + 1] : null;

    return (
        <motion.div
            className="h-[calc(100vh-64px)] md:h-screen flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Reader content with SmartReader handling scroll and focus mode */}
            <div className="flex-1 overflow-hidden relative">
                <SmartReader bookId={bookId} chapter={chapter} />
            </div>

            {/* Bottom Navigation (Always visible unless in Focus Mode - handled by SmartReader) */}
            <nav className="glass border-t border-[var(--glass-border)] p-4 shrink-0 z-40 bg-[var(--color-bg-primary)]/80 backdrop-blur-md">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                    {/* Previous Chapter */}
                    {prevChapter ? (
                        <Link
                            to={`/book/${bookId}/chapter/${prevChapter.chapterId}`}
                            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[var(--color-bg-secondary)] transition-colors group"
                        >
                            <ArrowRight size={20} className="text-[var(--color-text-muted)] group-hover:text-gold transition-colors" />
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] text-[var(--color-text-muted)]">پچھلا باب</p>
                                <p className="text-sm font-urdu text-[var(--color-text-secondary)] group-hover:text-gold transition-colors truncate max-w-[150px]">
                                    {prevChapter.title_ur}
                                </p>
                            </div>
                        </Link>
                    ) : (
                        <div className="opacity-30 flex items-center gap-3 px-4 py-2 cursor-not-allowed">
                            <ArrowRight size={20} />
                            <span className="text-sm hidden sm:inline">آغاز</span>
                        </div>
                    )}

                    {/* Chapter indicator */}
                    <div className="text-center">
                        <Link to={`/book/${bookId}`} className="text-xs text-[var(--color-text-muted)] hover:text-gold transition-colors">
                            فہرست
                        </Link>
                        <p className="text-lg font-bold text-gold font-sans leading-none mt-1">
                            {currentIndex + 1} <span className="text-[var(--color-text-muted)] text-sm font-normal">/ {book.chapters.length}</span>
                        </p>
                    </div>

                    {/* Next Chapter */}
                    {nextChapter ? (
                        <Link
                            to={`/book/${bookId}/chapter/${nextChapter.chapterId}`}
                            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[var(--color-bg-secondary)] transition-colors group"
                        >
                            <div className="text-left hidden sm:block">
                                <p className="text-[10px] text-[var(--color-text-muted)]">اگلا باب</p>
                                <p className="text-sm font-urdu text-[var(--color-text-secondary)] group-hover:text-gold transition-colors truncate max-w-[150px]">
                                    {nextChapter.title_ur}
                                </p>
                            </div>
                            <ArrowLeft size={20} className="text-[var(--color-text-muted)] group-hover:text-gold transition-colors" />
                        </Link>
                    ) : (
                        <div className="opacity-30 flex items-center gap-3 px-4 py-2 cursor-not-allowed">
                            <span className="text-sm hidden sm:inline">اختتام</span>
                            <ArrowLeft size={20} />
                        </div>
                    )}
                </div>
            </nav>
        </motion.div>
    );
}
