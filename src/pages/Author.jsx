import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuthorCard3D from '../components/UI/AuthorCard3D';
import booksData from '../data/books.json';
import { Heart, MessageCircle } from 'lucide-react';
const timelineData = [
    { year: '۲۰۱۰', title_ur: 'علمی سفر کا آغاز', description_ur: 'حوزہ علمیہ میں داخلہ اور دینی تعلیم کا آغاز' },
    { year: '۲۰۱۵', title_ur: 'تبلیغی خدمات', description_ur: 'مساجد میں خطابات اور دینی تعلیمات کا سلسلہ' },
    { year: '۲۰۱۸', title_ur: 'تالیفات', description_ur: 'پہلی کتاب "روحِ کربلا" کی اشاعت' },
    { year: '۲۰۲۰', title_ur: 'ڈیجیٹل دعوت', description_ur: 'آن لائن تعلیمی پلیٹ فارم کا آغاز' },
    { year: '۲۰۲۴', title_ur: 'عالمی خدمات', description_ur: 'بین الاقوامی سطح پر دینی خدمات کی توسیع' }
];

export default function Author() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <div ref={containerRef} className="min-h-screen w-full overflow-x-hidden bg-[var(--color-bg-primary)] selection:bg-gold/30">
            {/* Hero Section */}
            <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 lg:py-0">
                {/* Parallax Background */}
                <motion.div
                    className="absolute inset-0 pattern-arabesque opacity-10 md:opacity-20"
                    style={{ y: backgroundY }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg-primary)]/90 to-[var(--color-bg-primary)]"></div>

                <div className="relative z-10 container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                        {/* 3D Card - Moves to top on mobile */}
                        <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 perspective-1000">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                className="w-[280px] sm:w-[350px] md:w-[400px]"
                            >
                                <AuthorCard3D name="مفتی سجاد" role="عالم دین" />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full lg:w-1/2 text-center lg:text-right order-2 lg:order-1">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="font-urdu text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-gold mb-4 leading-tight"
                            >
                                مفتی سجاد
                            </motion.h1>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] font-urdu mb-10 opacity-90"
                            >
                                عالمِ دین، مصنف، اور داعیِ اسلام
                            </motion.p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <a href="#works" className="px-10 py-4 rounded-xl bg-gradient-gold-teal text-[var(--color-bg-primary)] font-bold font-urdu shadow-lg shadow-gold/10 hover:scale-105 active:scale-95 transition-all text-center">
                                    تصنیفات دیکھیں
                                </a>
                                <a href="#contact" className="px-10 py-4 rounded-xl glass border border-gold/20 text-gold font-urdu hover:bg-gold/5 transition-all text-center">
                                    رابطہ کریں
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-12 lg:p-16 rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden border border-white/5"
                    >
                        <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none select-none">
                            <span className="font-arabic-heading text-[12rem] md:text-[20rem] text-gold leading-none">ع</span>
                        </div>

                        <h2 className="font-urdu text-3xl md:text-4xl text-gold mb-8 relative border-r-4 border-gold pr-4">تعارف</h2>

                        <div className="space-y-6 font-urdu text-[var(--color-text-primary)] leading-[2] sm:leading-[2.4] text-lg md:text-xl text-justify">
                            <p>مفتی سجاد صاحب ایک ممتاز عالمِ دین اور مصنف ہیں۔ آپ نے حوزہ علمیہ سے فراغت حاصل کی اور دینی علوم میں مہارت پیدا کی۔ آپ کا اندازِ بیان علمی اور تحقیقی ہونے کے ساتھ ساتھ نہایت سادہ اور دلنشین ہے۔</p>
                            <p>آپ کی تحریریں اسلامی تعلیمات کو عصرِ حاضر کے تقاضوں سے ہم آہنگ کرتی ہیں۔ خاص طور پر واقعہ کربلا اور اہل بیت علیہم السلام کی سیرت پر آپ کی تحقیقات نوجوان نسل کے لیے مشعلِ راہ ہیں۔</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 px-5 bg-black/10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-urdu text-4xl text-gold text-center mb-20">علمی سفر</h2>

                    <div className="relative">
                        {/* Line: Right on mobile, Center on Desktop */}
                        <div className="absolute right-4 lg:right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/50 via-teal/50 to-gold/50"></div>

                        <div className="space-y-16">
                            {timelineData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start lg:items-center gap-8`}
                                >
                                    {/* Card */}
                                    <div className="w-full lg:w-[45%] pr-12 lg:pr-0">
                                        <div className={`glass-card p-6 rounded-2xl border-b-4 border-gold/40 relative ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                            <span className="text-teal font-bold text-sm tracking-widest">{item.year}</span>
                                            <h3 className="font-urdu text-xl text-gold mt-1 mb-2">{item.title_ur}</h3>
                                            <p className="text-[var(--color-text-secondary)] font-urdu text-base sm:text-lg leading-relaxed">
                                                {item.description_ur}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute right-2 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-gold shadow-[0_0_15px_rgba(212,168,85,0.6)] z-10 border-2 border-[var(--color-bg-primary)]"></div>

                                    <div className="hidden lg:block lg:w-[45%]"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Works Section */}
            <section id="works" className="py-24 px-5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4 text-center md:text-right">
                        <h2 className="font-urdu text-4xl text-gold">تصنیفات</h2>
                        <p className="text-[var(--color-text-muted)] font-urdu">تازہ ترین علمی شاہکار</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {booksData.map((book, index) => (
                            <motion.div
                                key={book.bookId}
                                whileHover={{ y: -8 }}
                                className="h-full"
                            >
                                <Link to={`/book/${book.bookId}/chapter/1`} className="glass-card-gold p-6 rounded-2xl flex flex-col h-full group border border-white/5 hover:border-gold/30 transition-all">
                                    <div className="flex items-center gap-5 mb-6">
                                        <div className={`w-16 h-24 sm:w-20 sm:h-28 rounded-lg shrink-0 shadow-2xl bg-gradient-to-br ${book.cover_style === 'gold-teal' ? 'from-amber-700 to-teal-900' : 'from-slate-800 to-teal-900'} flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform`}>
                                            <span className="font-arabic-heading text-3xl text-white/40">{book.title_ur.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-urdu text-lg sm:text-xl text-gold leading-snug group-hover:text-gold/80">{book.title_ur}</h3>
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1 uppercase tracking-widest font-sans">{book.title_en}</p>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-sm font-urdu">
                                        <span className="text-teal">{book.total_chapters} ابواب</span>
                                        <span className="text-gold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            مطالعہ شروع کریں <span>←</span>
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <footer id="contact" className="py-24 px-5 border-t border-white/5 bg-black/20 text-center">
                <h2 className="font-urdu text-3xl text-gold mb-16">رابطہ کیجیے</h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8"
                >
                    {/* سوشل میڈیا لنکس */}
                    <div className="flex gap-5 mb-4">
                        {['twitter', 'youtube', 'telegram'].map((icon) => (
                            <a key={icon} href="#" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-all uppercase text-[10px] font-bold">{icon.slice(0, 3)}</a>
                        ))}
                    </div>

                    {/* اردو کریڈٹ لائن */}
                    <div className="pt-10 border-t border-white/5 w-full max-w-2xl flex flex-col items-center gap-5">
                        <div className="flex flex-col sm:flex-row-reverse items-center gap-3 font-urdu text-xl sm:text-2xl text-[var(--color-text-secondary)]">
                            <span className="flex items-center gap-3">
                                محبت
                                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                                اور عقیدت کے ساتھ تخلیق کیا
                            </span>
                            <span className="hidden sm:inline opacity-20">|</span>
                            <span className="flex gap-2">
                                از
                                <a
                                    href="https://wa.me/923475484803"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gold font-bold hover:text-gold/80 hover:underline underline-offset-8 decoration-gold/30 transition-all active:scale-95"
                                >
                                    ثقلین شاہ
                                </a>
                            </span>
                        </div>


                        <p className="mt-6 text-[10px] text-[var(--color-text-muted)] font-sans opacity-30 uppercase tracking-[0.4em]">
                            © {new Date().getFullYear()} Mufti Sajjad. Digital Library Project.
                        </p>
                    </div>
                </motion.div>
            </footer>
        </div>
    );
}