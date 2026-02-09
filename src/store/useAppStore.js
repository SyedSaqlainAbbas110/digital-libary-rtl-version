import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // User state
      userType: 'guest', // 'guest' | 'registered'
      
      // Reading progress: { bookId: { chapterId: { percentage, scrollPosition } } }
      readingProgress: {},
      
      // Last read position
      lastRead: null, // { bookId, chapterId, scrollPosition, timestamp }
      
      // Bookmarks: [{ id, bookId, chapterId, text, timestamp }]
      bookmarks: [],
      
      // UI state
      sidebarOpen: true,
      currentTheme: 'dark',
      fontSize: 'medium', // 'small' | 'medium' | 'large'
      
      // Actions
      setUserType: (type) => set({ userType: type }),
      
      updateProgress: (bookId, chapterId, percentage, scrollPosition) => {
        const { readingProgress } = get();
        set({
          readingProgress: {
            ...readingProgress,
            [bookId]: {
              ...(readingProgress[bookId] || {}),
              [chapterId]: { percentage, scrollPosition }
            }
          },
          lastRead: {
            bookId,
            chapterId,
            scrollPosition,
            timestamp: Date.now()
          }
        });
      },
      
      getChapterProgress: (bookId, chapterId) => {
        const { readingProgress } = get();
        return readingProgress[bookId]?.[chapterId] || { percentage: 0, scrollPosition: 0 };
      },
      
      getBookProgress: (bookId) => {
        const { readingProgress } = get();
        const chapters = readingProgress[bookId] || {};
        const chapterKeys = Object.keys(chapters);
        if (chapterKeys.length === 0) return 0;
        
        const totalProgress = chapterKeys.reduce((sum, key) => {
          return sum + (chapters[key].percentage || 0);
        }, 0);
        return Math.round(totalProgress / chapterKeys.length);
      },
      
      addBookmark: (bookId, chapterId, text, contentIndex) => {
        const { bookmarks } = get();
        const newBookmark = {
          id: `bm_${Date.now()}`,
          bookId,
          chapterId,
          text: text.substring(0, 200),
          contentIndex,
          timestamp: Date.now()
        };
        set({ bookmarks: [...bookmarks, newBookmark] });
        return newBookmark;
      },
      
      removeBookmark: (bookmarkId) => {
        const { bookmarks } = get();
        set({ bookmarks: bookmarks.filter(bm => bm.id !== bookmarkId) });
      },
      
      getBookmarks: (bookId, chapterId) => {
        const { bookmarks } = get();
        if (!bookId) return bookmarks;
        if (!chapterId) return bookmarks.filter(bm => bm.bookId === bookId);
        return bookmarks.filter(bm => bm.bookId === bookId && bm.chapterId === chapterId);
      },
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setFontSize: (size) => set({ fontSize: size }),
      
      setTheme: (theme) => set({ currentTheme: theme }),
      
      clearAllData: () => set({
        readingProgress: {},
        lastRead: null,
        bookmarks: []
      })
    }),
    {
      name: 'islamic-reading-portal-storage',
      version: 1,
    }
  )
);

export default useAppStore;
