import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import BookCard from '../components/Library/BookCard';
import SkeletonCard from '../components/Library/SkeletonCard';
import booksData from '../data/books.json';
import useAppStore from '../store/useAppStore';

const ITEMS_PER_PAGE = 8;

export default function Library() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { lastRead } = useAppStore();

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setBooks(booksData);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Filter Logic
    const filteredBooks = useMemo(() => {
        return books.filter(book =>
            book.title_ur.includes(searchQuery) ||
            book.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author_ur.includes(searchQuery)
        );
    }, [books, searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Find the last read book details
    const lastReadBook = lastRead ? booksData.find(b => b.bookId === lastRead.bookId) : null;
    const lastReadChapter = lastReadBook ? lastReadBook.chapters.find(c => c.chapterId === lastRead.chapterId) : null;

    return (
        <div className="min-h-full p-4 lg:p-8 pb-20">
            {/* Hero Section */}
            <motion.header
                className="mb-8 lg:mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="glass-card-gold p-6 lg:p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 pattern-geometric opacity-50"></div>

                    <div className="relative z-10">
                        <h1 className="font-urdu text-3xl lg:text-4xl text-gold leading-relaxed mb-2">
                            بسم اللہ الرحمٰن الرحیم
                        </h1>
                        <p className="text-lg text-[var(--color-text-secondary)] font-urdu">
                            علم کی روشنی میں قدم رکھیں
                        </p>

                        {/* Continue Reading Quick Link */}
                        {lastRead && lastReadBook && (
                            <motion.div
                                className="mt-6 pt-4 border-t border-[var(--glass-border)] inline-block"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    to={`/book/${lastRead.bookId}/chapter/${lastRead.chapterId}`}
                                    className="inline-flex items-center gap-4 px-5 py-3 rounded-xl bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:scale-[1.02] transition-all border border-[var(--color-gold)]/20"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-gradient-gold-teal flex items-center justify-center shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-bg-primary)] ml-0.5">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--color-text-muted)] mb-0.5">مطالعہ جاری رکھیں</p>
                                        <p className="text-base font-urdu text-gold leading-none">
                                            {lastReadBook.title_ur} - {lastReadChapter?.title_ur || 'باب ' + lastRead.chapterId}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <h2 className="font-urdu text-2xl text-[var(--color-text-primary)] border-b-2 border-[var(--color-gold)] pb-1 inline-block shrink-0 ml-4">کتب خانہ</h2>
                    <span className="text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-3 py-1 rounded-full shrink-0">
                        {filteredBooks.length} کتابیں
                    </span>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <input
                            type="text"
                            placeholder="تلاش کریں..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--glass-border)] focus:border-gold outline-none font-urdu text-[var(--color-text-primary)] transition-colors text-right"
                        />
                        <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    </div>
                    {/* Placeholder for future filter dropdown */}
                    <button className="p-2 rounded-xl bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] hover:text-gold transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Books Grid */}
            <div className="min-h-[300px]">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={currentPage + searchQuery} // Re-animate on page/search change
                >
                    {loading ? (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        paginatedBooks.map((book, index) => (
                            <BookCard key={book.bookId} book={book} index={index} />
                        ))
                    )}
                </motion.div>
            </div>

            {/* Empty State */}
            {!loading && filteredBooks.length === 0 && (
                <motion.div
                    className="text-center py-16 glass-card rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <span className="text-6xl mb-4 block">🔍</span>
                    <h3 className="font-urdu text-xl text-[var(--color-text-secondary)]">
                        کوئی کتاب نہیں ملی
                    </h3>
                </motion.div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-[var(--color-bg-secondary)] disabled:opacity-50 hover:text-gold transition-colors"
                    >
                        <ChevronRight />
                    </button>

                    <span className="font-urdu text-[var(--color-text-primary)]">
                        صفحہ {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-[var(--color-bg-secondary)] disabled:opacity-50 hover:text-gold transition-colors"
                    >
                        <ChevronLeft />
                    </button>
                </div>
            )}
        </div>
    );
}
