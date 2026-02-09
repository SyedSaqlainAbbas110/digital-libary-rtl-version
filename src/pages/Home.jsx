import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    Library,
    Feather,
    Sparkles,
    Heart,
    Twitter,
    Youtube,
    Send
} from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-full pb-20 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12">
                {/* Background Elements */}
                <div className="absolute inset-0 pattern-arabesque opacity-20 animate-pulse-slow"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="font-arabic-heading text-8xl md:text-9xl text-gold block mb-6 drop-shadow-lg">اقرأ</span>

                        <h1 className="font-urdu text-4xl md:text-6xl text-[var(--color-text-primary)] mb-6 leading-tight">
                            علم و آگہی کا روشن سفر
                        </h1>

                        <p className="font-urdu text-xl md:text-2xl text-[var(--color-text-secondary)] mb-10 leading-loose max-w-2xl mx-auto opacity-90">
                            دینی و علمی کتب کا ایک وسیع ذخیرہ، جدید انداز اور خوبصورت پیشکش کے ساتھ۔
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/library"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-gold-teal text-[var(--color-bg-primary)] font-bold font-urdu text-xl hover:scale-105 transition-transform shadow-lg shadow-gold/20 flex items-center justify-center gap-3"
                            >
                                <Library size={24} />
                                کتب خانہ دیکھیں
                            </Link>
                            <Link
                                to="/author"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass border border-gold/30 text-gold font-urdu text-xl hover:bg-gold/10 transition-colors flex items-center justify-center gap-3"
                            >
                                مصنف کا تعارف
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 px-4 bg-[var(--color-bg-secondary)]/30 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-teal font-urdu text-lg block mb-2 opacity-80">نمایاں خصوصیات</span>
                        <h2 className="font-urdu text-4xl text-gold">مطالعہ کا نیا انداز</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'وسیع ذخیرہ', icon: <BookOpen className="w-12 h-12 text-gold" />, desc: 'قرآن، حدیث، سیرت اور تاریخ پر مستند کتب' },
                            { title: 'خوبصورت خطاطی', icon: <Feather className="w-12 h-12 text-teal" />, desc: 'نستعلیق اور عربی فونٹس میں بہترین پیشکش' },
                            { title: 'جدید سہولیات', icon: <Sparkles className="w-12 h-12 text-gold" />, desc: 'نائٹ موڈ، سرچ اور بک مارک کی سہولت' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="glass-card p-10 rounded-3xl text-center hover:border-gold/30 transition-all group"
                            >
                                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h3 className="font-urdu text-2xl text-[var(--color-text-primary)] mb-4">{feature.title}</h3>
                                <p className="font-urdu text-[var(--color-text-secondary)] text-lg leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Book Preview */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto glass-card-gold rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border border-gold/10">
                    <div className="absolute inset-0 pattern-geometric opacity-20 pointer-events-none"></div>

                    <div className="relative z-10 flex-1 text-center md:text-right">
                        <div className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold mb-6 border border-gold/30 uppercase tracking-widest">
                            New Release
                        </div>
                        <h2 className="font-urdu text-4xl md:text-5xl text-white mb-6">روحِ کربلا</h2>
                        <p className="font-urdu text-[var(--color-text-secondary)] text-lg mb-8 leading-loose opacity-90">
                            واقعہ کربلا کے روحانی اور عرفانی پہلوؤں پر ایک منفرد اور فکر انگیز تحریر۔ ابھی مطالعہ شروع کریں۔
                        </p>
                        <Link
                            to="/book/essence-of-karbala"
                            className="inline-flex flex-row-reverse items-center gap-2 text-gold font-urdu text-xl hover:gap-4 transition-all group"
                        >
                            <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                            مطالعہ کریں
                        </Link>
                    </div>

                    <div className="relative z-10 w-48 md:w-64 aspect-[2/3] bg-gradient-to-br from-amber-900 to-slate-900 rounded-xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 border border-white/10 flex items-center justify-center group overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        <span className="font-arabic-heading text-8xl text-white/20 select-none">ع</span>
                    </div>
                </div>
            </section>

            {/* Updated Footer */}
            <footer id="contact" className="py-16 px-5 border-t border-white/5 bg-black/40 text-center">
                <h2 className="font-urdu text-2xl text-gold mb-10 opacity-80">رابطہ کیجیے</h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8"
                >
                    {/* سوشل میڈیا لنکس */}
                    <div className="flex gap-4">
                        {[
                            { name: 'twitter', icon: <Twitter size={18} /> },
                            { name: 'youtube', icon: <Youtube size={18} /> },
                            { name: 'telegram', icon: <Send size={18} /> }
                        ].map((social) => (
                            <a
                                key={social.name}
                                href="#"
                                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-all shadow-lg"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* اردو کریڈٹ لائن - Smaller Font */}
                    <div className="pt-8 border-t border-white/5 w-full max-w-xl flex flex-col items-center gap-4">
                        <div className="flex flex-col sm:flex-row-reverse items-center gap-2 font-urdu text-sm sm:text-base text-[var(--color-text-secondary)] opacity-80">
                            <span className="flex items-center gap-2">
                                محبت
                                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                                اور عقیدت کے ساتھ تخلیق کیا
                            </span>
                            <span className="hidden sm:inline opacity-20">|</span>
                            <span className="flex gap-1.5">
                                از
                                <a
                                    href="https://wa.me/923475484803"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gold font-bold hover:text-gold/80 transition-all active:scale-95"
                                >
                                    ثقلین شاہ
                                </a>
                            </span>
                        </div>

                        <p className="text-[9px] text-[var(--color-text-muted)] font-sans opacity-20 uppercase tracking-[0.5em]">
                            © {new Date().getFullYear()} Mufti Sajjad. Digital Library Project.
                        </p>
                    </div>
                </motion.div>
            </footer>
        </div>
    );
}