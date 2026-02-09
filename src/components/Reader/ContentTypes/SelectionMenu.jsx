import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../../store/useAppStore';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default function SelectionMenu({ bookId, chapterId }) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [selectedText, setSelectedText] = useState('');
    const [copied, setCopied] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const menuRef = useRef(null);
    const { addBookmark } = useAppStore();

    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            const text = selection?.toString().trim();

            if (text && text.length > 0) {
                setSelectedText(text);

                // Get selection position
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();

                setPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10
                });
                setIsVisible(true);
                setCopied(false);
                setBookmarked(false);
            } else {
                setIsVisible(false);
            }
        };

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(selectedText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = async () => {
        // Create a shareable quote card
        const shareData = {
            title: 'اقتباس از روحِ کربلا',
            text: selectedText,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Share failed:', err);
                }
            }
        } else {
            // Fallback: copy to clipboard
            handleCopy();
        }

        setIsVisible(false);
    };

    const handleBookmark = () => {
        addBookmark(bookId, chapterId, selectedText, 0);
        setBookmarked(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    };

    const menuItems = [
        {
            icon: copied ? CheckIcon : CopyIcon,
            label: copied ? 'کاپی شد' : 'کاپی',
            onClick: handleCopy,
            highlight: copied
        },
        {
            icon: ShareIcon,
            label: 'شیئر',
            onClick: handleShare
        },
        {
            icon: bookmarked ? CheckIcon : BookmarkIcon,
            label: bookmarked ? 'محفوظ شد' : 'نشانی',
            onClick: handleBookmark,
            highlight: bookmarked
        },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="fixed z-[100] -translate-x-1/2 -translate-y-full"
                    style={{ left: position.x, top: position.y }}
                >
                    <div className="glass-card px-1 py-1 flex items-center gap-0.5 shadow-2xl">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.button
                                    key={index}
                                    onClick={item.onClick}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-urdu
                    transition-colors duration-200
                    ${item.highlight
                                            ? 'bg-[var(--color-teal)]/20 text-teal'
                                            : 'hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-gold'
                                        }
                  `}
                                >
                                    <Icon />
                                    <span>{item.label}</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Arrow pointing down */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[var(--glass-bg)]"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
