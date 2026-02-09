import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            return;
        }

        // Check if user has dismissed the prompt recently
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (dismissed) {
            const dismissedTime = new Date(dismissed).getTime();
            const now = new Date().getTime();
            const dayInMs = 24 * 60 * 60 * 1000;
            if (now - dismissedTime < dayInMs * 7) {
                return;
            }
        }

        const handleBeforeInstall = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show prompt after a delay
            setTimeout(() => setShowPrompt(true), 3000);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setShowPrompt(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setIsInstalled(true);
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString());
    };

    if (isInstalled || !showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-80 z-50"
            >
                <div className="glass-card-teal p-4 shadow-2xl">
                    <button
                        onClick={handleDismiss}
                        className="absolute top-2 left-2 p-1 rounded-lg hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        <CloseIcon />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-gold-teal flex items-center justify-center shrink-0">
                            <span className="text-[var(--color-bg-primary)] font-bold text-xl font-arabic-heading">ق</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-urdu text-gold text-lg mb-1">ایپ انسٹال کریں</h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                                آف لائن مطالعہ کے لیے ایپ انسٹال کریں
                            </p>

                            <motion.button
                                onClick={handleInstall}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-gold-teal text-[var(--color-bg-primary)] font-semibold text-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <DownloadIcon />
                                <span className="font-urdu">انسٹال</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
