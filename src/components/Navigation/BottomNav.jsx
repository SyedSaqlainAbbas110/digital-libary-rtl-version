import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Bookmark, User } from 'lucide-react';

export default function BottomNav() {
    const location = useLocation();
    const isBookPage = location.pathname.includes('/book/');

    const navItems = [
        { path: '/', icon: <Home size={20} />, label: 'مکتبہ', match: '/' },
        { path: '/book/essence-of-karbala', icon: <BookOpen size={20} />, label: 'مطالعہ', bookOnly: true },
        { path: '/bookmarks', icon: <Bookmark size={20} />, label: 'نشانیاں', match: '/bookmarks' },
        { path: '/author', icon: <User size={20} />, label: 'مصنف', match: '/author' },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass z-50 border-t border-[var(--glass-border)]">
            <div className="flex flex-row-reverse items-center h-16 px-2">
                {navItems.map((item) => {
                    // چیک کریں کہ کیا بٹن ایکٹو ہے
                    const isActive = item.match ? location.pathname === item.match : location.pathname.includes(item.path);

                    // اگر 'مطالعہ' کا بٹن ہے اور کوئی کتاب نہیں کھلی، تو اسے ڈس ایبل کریں
                    const isDisabled = item.bookOnly && !isBookPage;

                    return (
                        <Link
                            key={item.label}
                            to={isDisabled ? '#' : item.path}
                            className={`flex flex-col items-center justify-center flex-1 py-2 relative transition-all duration-300 ${isDisabled ? 'opacity-20 grayscale cursor-not-allowed' : 'opacity-100'
                                }`}
                        >
                            <motion.div
                                whileTap={!isDisabled ? { scale: 0.9 } : {}}
                                className={`${isActive ? 'text-gold scale-110' : 'text-white/40'}`}
                            >
                                {item.icon}

                                {isActive && !isDisabled && (
                                    <motion.div
                                        layoutId="bottomNavGlow"
                                        className="absolute inset-0 bg-gold/10 blur-xl rounded-full"
                                    />
                                )}
                            </motion.div>
                            <span className={`font-urdu text-[10px] mt-1 ${isActive ? 'text-gold font-bold' : 'text-white/40'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}