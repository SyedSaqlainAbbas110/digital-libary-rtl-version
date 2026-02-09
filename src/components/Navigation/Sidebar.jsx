import { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import sampleBook from '../../data/sampleBook.json';
import { ChevronDown, ChevronUp, BookMarked, CheckCircle2, List, X } from 'lucide-react';

const CheckIcon = () => <CheckCircle2 size={14} className="text-white" />;

export default function Sidebar() {
    const { chapterId: currentChapterId } = useParams();
    const location = useLocation();
    const { sidebarOpen, toggleSidebar, getChapterProgress, getBookmarks } = useAppStore();
    const [bookmarksExpanded, setBookmarksExpanded] = useState(false);

    // صرف کتاب والے روٹ پر دکھائیں
    const isBookPage = location.pathname.includes('/book/');
    if (!isBookPage) return null;

    const bookmarks = getBookmarks(sampleBook.bookId) || [];

    return (
        <AnimatePresence>
            {sidebarOpen && (
                <>
                    {/* موبائل کے لیے بیک ڈراپ (سایہ) - اس پر کلک کرنے سے مینو بند ہوگا */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                    />

                    {/* مین سائڈ بار کنٹینر */}
                    <motion.aside
                        initial={{ x: '100%' }} // دائیں طرف سے آئے گا
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[85%] sm:w-80 bg-[var(--color-bg-primary)] z-[70] border-l border-white/10 flex flex-col shadow-2xl lg:relative lg:translate-x-0 lg:z-40"
                    >
                        {/* Header: موبائل پر بند کرنے کا بٹن */}
                        <div className="p-5 border-b border-white/5 flex flex-row-reverse items-center justify-between bg-black/20">
                            <h2 className="font-urdu text-xl text-gold">فہرستِ ابواب</h2>
                            <button
                                onClick={toggleSidebar}
                                className="p-2 text-gold/50 hover:text-gold lg:hidden transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Overall Progress */}
                        <div className="p-5 bg-white/5">
                            <div className="flex justify-between text-[10px] text-white/40 mb-2 uppercase tracking-widest font-sans">
                                <span>Reading Progress</span>
                                <span>35%</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '35%' }}
                                    className="h-full bg-gold shadow-[0_0_10px_rgba(212,168,85,0.4)]"
                                />
                            </div>
                        </div>

                        {/* Chapters List */}
                        <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                            <ul className="space-y-1">
                                {sampleBook.chapters.map((chapter, index) => {
                                    const progress = getChapterProgress(sampleBook.bookId, chapter.chapterId);
                                    const isActive = parseInt(currentChapterId) === chapter.chapterId;
                                    const isComplete = progress.percentage >= 100;

                                    return (
                                        <li key={chapter.chapterId}>
                                            <Link
                                                to={`/book/${sampleBook.bookId}/chapter/${chapter.chapterId}`}
                                                onClick={() => {
                                                    if (window.innerWidth < 1024) toggleSidebar(); // موبائل پر کلک کرنے کے بعد مینو بند ہو جائے
                                                }}
                                                className={`
                                                    group block p-4 rounded-xl transition-all duration-300
                                                    ${isActive
                                                        ? 'bg-gold/10 border-r-4 border-gold'
                                                        : 'hover:bg-white/5 border-r-4 border-transparent'}
                                                `}
                                            >
                                                <div className="flex flex-row-reverse items-center gap-3">
                                                    <div className={`
                                                        w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold
                                                        ${isComplete ? 'bg-teal text-white' : isActive ? 'bg-gold text-black' : 'bg-white/10 text-white/30'}
                                                    `}>
                                                        {isComplete ? <CheckIcon /> : index + 1}
                                                    </div>
                                                    <p className={`
                                                        font-urdu text-right flex-1 transition-colors
                                                        ${isActive ? 'text-gold' : 'text-white/80 group-hover:text-gold'}
                                                    `}>
                                                        {chapter.title_ur}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Collapsible Bookmarks */}
                        {bookmarks.length > 0 && (
                            <div className="border-t border-white/5 bg-black/40 pb-safe">
                                <button
                                    onClick={() => setBookmarksExpanded(!bookmarksExpanded)}
                                    className="w-full p-4 flex flex-row-reverse items-center justify-between text-gold/80 hover:text-gold transition-colors"
                                >
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <BookMarked size={18} />
                                        <span className="font-urdu text-sm">محفوظ نشانیاں</span>
                                    </div>
                                    {bookmarksExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                                </button>

                                <AnimatePresence>
                                    {bookmarksExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-black/20"
                                        >
                                            <ul className="px-4 pb-4 space-y-2 max-h-40 overflow-y-auto">
                                                {bookmarks.map((b) => (
                                                    <li key={b.id}>
                                                        <Link
                                                            to={`/book/${b.bookId}/chapter/${b.chapterId}`}
                                                            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                                                            className="block p-3 rounded-lg bg-white/5 text-[11px] text-white/50 hover:text-gold font-urdu text-right truncate"
                                                        >
                                                            {b.text}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}