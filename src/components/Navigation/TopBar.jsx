import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { Menu, X, Type, ChevronRight } from 'lucide-react';

export default function TopBar() {
    const { sidebarOpen, toggleSidebar, fontSize, setFontSize } = useAppStore();
    const location = useLocation();
    const isBookPage = location.pathname.includes('/book/');

    const fontSizes = [
        { key: 'small', label: 'ا', sizeClass: 'text-xs' },
        { key: 'medium', label: 'ا', sizeClass: 'text-base' },
        { key: 'large', label: 'ا', sizeClass: 'text-xl' }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 glass z-50 border-b border-white/5 shadow-2xl">
            <div className="h-16 px-4 flex flex-row-reverse items-center justify-between max-w-7xl mx-auto">

                {/* Right Side: Logo */}
                <Link to="/" className="flex flex-row-reverse items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-gold-teal flex items-center justify-center shadow-lg">
                        <span className="text-black font-bold text-xl font-arabic-heading pt-1">ق</span>
                    </div>
                </Link>

                {/* Left Side: Actions */}
                <div className="flex flex-row-reverse items-center gap-2 md:gap-4">

                    {/* Sidebar Toggle (Table of Contents) */}
                    {isBookPage && (
                        <button
                            onClick={toggleSidebar}
                            className={`flex flex-row-reverse items-center gap-2 px-3 py-2 rounded-xl transition-all ${sidebarOpen ? 'bg-gold text-black' : 'bg-gold/10 text-gold border border-gold/20'
                                }`}
                        >
                            <span className="font-urdu text-sm hidden sm:block">
                                {sidebarOpen ? 'بند کریں' : 'فہرست'}
                            </span>
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    )}

                    {/* Mobile Font Size Controls */}
                    {isBookPage && (
                        <div className="flex flex-row-reverse items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/5">
                            {fontSizes.map((size) => (
                                <button
                                    key={size.key}
                                    onClick={() => setFontSize(size.key)}
                                    className={`w-8 h-8 rounded-lg font-urdu transition-all ${fontSize === size.key
                                        ? 'bg-gold text-black shadow-md'
                                        : 'text-white/40 hover:text-gold'
                                        }`}
                                >
                                    {size.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}