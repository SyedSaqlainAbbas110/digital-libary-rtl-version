import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2 } from 'lucide-react';
import ContentRenderer from './ContentRenderer';
import SelectionMenu from './ContentTypes/SelectionMenu';
import LottieAnimation from '../UI/LottieAnimation';
import useAppStore from '../../store/useAppStore';

const loadingAnimation = null;

export default function SmartReader({ bookId, chapter }) {
    const containerRef = useRef(null);
    const { updateProgress, getChapterProgress, fontSize } = useAppStore();
    const [focusMode, setFocusMode] = useState(false);

    // --- فونٹ سائز کی نئی اور بہتر لاجک ---
    const fontSizeConfig = {
        small: 'text-lg md:text-xl leading-[1.8] md:leading-[2]',
        medium: 'text-xl md:text-2xl leading-[2] md:leading-[2.2]',
        large: 'text-2xl md:text-4xl leading-[2.2] md:leading-[2.5]'
    };

    const { scrollYProgress } = useScroll({
        container: containerRef,
        layoutEffect: false
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -20]);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const percentage = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
        updateProgress(bookId, chapter.chapterId, percentage);
    }, [bookId, chapter.chapterId, updateProgress]);

    useEffect(() => {
        if (!containerRef.current) return;
        const progress = getChapterProgress(bookId, chapter.chapterId);
        if (progress && progress.scrollPosition > 0) {
            containerRef.current.scrollTop = progress.scrollPosition;
        }
    }, [bookId, chapter.chapterId]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        let timeout;
        const onScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleScroll, 100);
        };
        container.addEventListener('scroll', onScroll);
        return () => {
            container.removeEventListener('scroll', onScroll);
            clearTimeout(timeout);
        };
    }, [handleScroll]);

    const progress = getChapterProgress(bookId, chapter.chapterId);

    return (
        <div className={`relative h-full flex flex-col transition-colors duration-500 ${focusMode ? 'bg-[var(--color-bg-primary)]' : ''}`}>

            {/* Focus Mode Toggle */}
            <button
                onClick={() => setFocusMode(!focusMode)}
                className="absolute top-4 left-4 z-50 p-3 rounded-xl glass-card hover:bg-gold hover:text-black transition-all shadow-xl"
            >
                {focusMode ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
            </button>

            {/* Progress Bar */}
            <AnimatePresence>
                {!focusMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="sticky top-0 z-40 h-1 w-full bg-white/5"
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-gold to-teal shadow-[0_0_10px_rgba(212,168,85,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <div
                ref={containerRef}
                className={`flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 pb-32 pt-6 transition-all duration-500 custom-scrollbar ${focusMode ? 'lg:px-48' : ''}`}
                style={{ scrollBehavior: 'smooth' }}
            >
                <div className="max-w-4xl mx-auto">
                    {/* Floating Header Inside Scroll Area */}
                    <motion.header
                        style={{ opacity: headerOpacity, y: headerY }}
                        className="mb-12 text-center border-b border-gold/10 pb-8"
                    >
                        <h1 className="font-urdu text-4xl md:text-6xl text-gold mb-4 leading-tight">
                            {chapter.title_ur}
                        </h1>
                        <div className="flex justify-center items-center gap-4 text-[var(--color-text-muted)] font-urdu">
                            <span className="w-8 h-px bg-gold/20"></span>
                            <span>{chapter.chapterId} باب</span>
                            <span className="w-8 h-px bg-gold/20"></span>
                        </div>
                    </motion.header>

                    {/* Main Text Content - Using Dynamic Font Config */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`font-urdu text-right select-text ${fontSizeConfig[fontSize] || fontSizeConfig.medium} text-[var(--color-text-primary)]`}
                        style={{ direction: 'rtl' }}
                    >
                        <ContentRenderer content={chapter.content} />
                    </motion.div>

                    {/* Chapter End Marker */}
                    <div className="mt-24 py-16 border-t border-white/5 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-40">
                            <span className="font-arabic-heading text-4xl text-gold">❋ ❋ ❋</span>
                            <p className="font-urdu text-lg">تمت بالخیر</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Context Menu Placeholder */}
            <SelectionMenu bookId={bookId} chapterId={chapter.chapterId} />
        </div>
    );
}