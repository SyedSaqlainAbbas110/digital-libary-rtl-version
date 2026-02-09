import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Navigation/Sidebar';
import TopBar from '../components/Navigation/TopBar';
import BottomNav from '../components/Navigation/BottomNav';
import useAppStore from '../store/useAppStore';

export default function MainLayout() {
    const { sidebarOpen } = useAppStore();

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
            <TopBar />

            <div className="flex flex-1 pt-16 relative overflow-hidden">
                {/* Sidebar اب موبائل پر بھی رینڈر ہوگا، اس کی اپنی فائل میں موبائل لاجک موجود ہے */}
                <Sidebar />

                <main
                    className={`
                        flex-1 min-h-[calc(100vh-4rem)]
                        transition-all duration-300 ease-in-out
                        pb-20 lg:pb-0
                        ${sidebarOpen ? 'lg:mr-72' : 'lg:mr-0'}
                    `}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full"
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>

            <BottomNav />
        </div>
    );
}