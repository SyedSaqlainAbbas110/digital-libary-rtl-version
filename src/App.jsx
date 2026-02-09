import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import Library from './pages/Library';
import Home from './pages/Home';
import Reader from './pages/Reader';
import Author from './pages/Author';
import BookDetails from './pages/BookDetails';
import BookmarksPage from './pages/BookmarksPage'; // یہ لائن ایرر ختم کر دے گی
import InstallPrompt from './components/InstallPrompt';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="book/:bookId" element={<BookDetails />} />
          <Route path="book/:bookId/chapter/:chapterId" element={<Reader />} />
          <Route path="author" element={<Author />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div dir="rtl" className="min-h-screen bg-[var(--color-bg-primary)] pattern-geometric">
        <AnimatedRoutes />
        <InstallPrompt />
      </div>
    </Router>
  );
}

export default App;