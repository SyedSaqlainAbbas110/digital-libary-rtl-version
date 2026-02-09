import { motion } from 'framer-motion';
import { Bookmark, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

export default function BookmarksPage() {
    const { getBookmarks, removeBookmark } = useAppStore();
    const bookmarks = getBookmarks(1) || []; // فرض کریں بک آئی ڈی 1 ہے

    return (
        <div className="min-h-screen pb-20 px-5 pt-10">
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-row-reverse items-center justify-between mb-12">
                    <h1 className="font-urdu text-3xl text-gold flex flex-row-reverse items-center gap-3">
                        <Bookmark className="text-gold" size={28} />
                        محفوظ نشانیاں
                    </h1>
                </header>

                {bookmarks.length === 0 ? (
                    <div className="glass p-12 rounded-[2rem] text-center border border-white/5">
                        <p className="font-urdu text-xl text-white/40">کوئی نشانی محفوظ نہیں ملی۔</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {bookmarks.map((b) => (
                            <motion.div key={b.id} className="glass p-5 rounded-2xl border border-white/5 flex flex-row-reverse justify-between items-center group">
                                <Link to={`/book/${b.bookId}/chapter/${b.chapterId}`} className="flex-1 text-right">
                                    <p className="font-urdu text-lg text-white group-hover:text-gold transition-colors">{b.text}</p>
                                </Link>
                                <button onClick={() => removeBookmark(b.id)} className="p-2 text-white/20 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}