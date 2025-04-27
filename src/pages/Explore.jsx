import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Explore() {
    // State untuk tab kategori aktif
    const [activeCategory, setActiveCategory] = useState('semua');
    
    // State untuk filter pencarian
    const [searchQuery, setSearchQuery] = useState('');
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 pb-16">
            {/* Hero section */}
            <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-white opacity-5"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-indigo-500 opacity-10 -mb-10 -mr-10"></div>
                    <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-blue-400 opacity-10"></div>
                </div>
                
                <div className="relative max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Jelajahi Dunia Karir & Pendidikan</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mb-8">
                        Temukan artikel, tips, dan resource terbaik untuk membantu kamu menemukan dan mengembangkan jalur karir impian.
                    </p>
                    
                    <div className="relative max-w-xl">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Cari topik, karir, atau jurusan..." 
                            className="w-full py-3 px-5 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <div className="absolute right-4 top-3 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Category Tabs */}
            <div className="bg-white sticky top-0 z-10 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 overflow-x-auto flex space-x-1 py-2">
                    {categories.map(category => (
                        <button 
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 whitespace-nowrap rounded-lg transition-all ${
                                activeCategory === category.id 
                                ? 'bg-blue-600 text-white font-medium' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <span className="mr-2">{category.icon}</span>
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Featured Section */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Pilihan Terbaik</h2>
                        <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <span>Lihat semua</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row"
                        >
                            <div className="md:w-2/5 relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                                    alt="Mahasiswa berdiskusi" 
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                                    TERPOPULER
                                </div>
                            </div>
                            <div className="p-6 md:w-3/5 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-xl mb-2">10 Jurusan Kuliah dengan Prospek Karir Terbaik 2025</h3>
                                    <p className="text-gray-600 mb-4">
                                        Mengenal jurusan kuliah yang paling diminati perusahaan dan memiliki prospek karir cerah di era digital.
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">12 April 2025 · 8 menit baca</span>
                                    <span className="text-blue-600">Baca Selengkapnya →</span>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row"
                        >
                            <div className="md:w-2/5 relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                                    alt="Tim bekerja sama" 
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                                    BARU
                                </div>
                            </div>
                            <div className="p-6 md:w-3/5 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Keterampilan Esensial untuk Sukses di Dunia Kerja 2025</h3>
                                    <p className="text-gray-600 mb-4">
                                        Apa saja soft skill dan hard skill yang paling dicari oleh perusahaan di era teknologi dan AI?
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">23 April 2025 · 6 menit baca</span>
                                    <span className="text-blue-600">Baca Selengkapnya →</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
                
                {/* Article Grid */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Artikel Terbaru</h2>
                        <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <span>Lihat semua</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.filter(article => 
                            activeCategory === 'semua' || article.category === activeCategory
                        ).map((article, index) => (
                            <motion.div 
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src={article.image} 
                                        alt={article.title} 
                                        className="w-full h-full object-cover hover:scale-105 transition-all"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center mb-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[article.category]}`}>
                                            {categories.find(cat => cat.id === article.category)?.name || article.category}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-2">{article.date}</span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                        <div className="flex items-center">
                                            <img 
                                                src={article.author.avatar} 
                                                alt={article.author.name}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                            <span className="text-sm text-gray-700">{article.author.name}</span>
                                        </div>
                                        <div className="flex text-gray-500 text-sm">
                                            <span className="flex items-center mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                {article.views}
                                            </span>
                                            <span className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                                {article.comments}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
                
                {/* Career Exploration Section */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Jelajahi Karir</h2>
                        <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <span>Lihat semua</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {careers.map((career, index) => (
                            <motion.div 
                                key={career.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition-all text-center"
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${careerColors[career.category]}`}>
                                    <span className="text-2xl">{career.icon}</span>
                                </div>
                                <h3 className="font-bold mb-2">{career.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                    {career.growth}% pertumbuhan
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>
                
                {/* Events Section */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Event & Webinar</h2>
                        <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <span>Lihat semua</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event, index) => (
                            <motion.div 
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-xl overflow-hidden shadow-md relative"
                            >
                                {event.featured && (
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md z-10">
                                        UNGGULAN
                                    </div>
                                )}
                                <div className="h-48 relative">
                                    <img 
                                        src={event.image} 
                                        alt={event.title} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <div className="flex items-center mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm">{event.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm">{event.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                                    <div className="mb-4 flex items-center">
                                        <span className={`px-2 py-1 text-xs rounded-full ${event.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {event.isFree ? 'GRATIS' : 'BERBAYAR'}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-2">{event.format}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                                    <button className={`w-full py-2 rounded-lg font-medium ${
                                        event.isFree 
                                            ? 'bg-green-500 text-white hover:bg-green-600' 
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}>
                                        {event.isFree ? 'Daftar Gratis' : 'Daftar Sekarang'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
                
                {/* Testimonials Section */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Cerita Sukses</h2>
                    </div>
                    
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl overflow-hidden shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <motion.div 
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 relative"
                                >
                                    <div className="text-5xl text-white opacity-20 absolute top-4 left-4">"</div>
                                    <div className="relative z-10">
                                        <p className="text-white mb-6 leading-relaxed">"{testimonial.quote}"</p>
                                        <div className="flex items-center">
                                            <img 
                                                src={testimonial.avatar} 
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full mr-4 border-2 border-white"
                                            />
                                            <div>
                                                <h5 className="font-bold text-white">{testimonial.name}</h5>
                                                <p className="text-blue-200 text-sm">{testimonial.position}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Subscribe CTA */}
                <section>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-10 lg:p-12 flex flex-col justify-center">
                                <h2 className="text-3xl font-bold mb-4">Dapatkan Panduan Karir Terbaru</h2>
                                <p className="text-gray-600 mb-6">
                                    Bergabunglah dengan +15.000 profesional dan mahasiswa yang menerima tips pengembangan karir langsung ke inbox mereka setiap minggu.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input 
                                        type="email" 
                                        placeholder="Alamat email kamu" 
                                        className="flex-grow py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium">
                                        Berlangganan
                                    </button>
                                </div>
                                <p className="mt-3 text-xs text-gray-500">
                                    Kami tidak akan pernah membagikan email kamu. Lihat kebijakan privasi kami.
                                </p>
                            </div>
                            <div className="hidden lg:block relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                                    alt="Mahasiswa dengan laptop" 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

// Data untuk kategori
const categories = [
    { id: 'semua', name: 'Semua', icon: '🌐' },
    { id: 'karir', name: 'Karir', icon: '💼' },
    { id: 'pendidikan', name: 'Pendidikan', icon: '🎓' },
    { id: 'teknologi', name: 'Teknologi', icon: '💻' },
    { id: 'kreativitas', name: 'Kreativitas', icon: '🎨' },
    { id: 'kesehatan', name: 'Kesehatan', icon: '⚕️' },
    { id: 'bisnis', name: 'Bisnis', icon: '📊' },
];

// Warna untuk kategori
const categoryColors = {
    karir: 'bg-blue-100 text-blue-800',
    pendidikan: 'bg-purple-100 text-purple-800',
    teknologi: 'bg-green-100 text-green-800',
    kreativitas: 'bg-pink-100 text-pink-800',
    kesehatan: 'bg-red-100 text-red-800',
    bisnis: 'bg-yellow-100 text-yellow-800',
};

// Warna untuk kategori karir
const careerColors = {
    teknologi: 'bg-blue-100 text-blue-600',
    kesehatan: 'bg-green-100 text-green-600',
    bisnis: 'bg-yellow-100 text-yellow-600',
    pendidikan: 'bg-purple-100 text-purple-600',
    kreativitas: 'bg-pink-100 text-pink-600',
    hukum: 'bg-indigo-100 text-indigo-600',
};

// Data untuk artikel
const articles = [
    {
        id: 1,
        title: 'Bagaimana AI Mengubah Lanskap Karir di Indonesia',
        excerpt: 'Perkembangan AI telah membuka banyak peluang karir baru. Mari kita bahas bagaimana AI mempengaruhi dunia kerja di Indonesia.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        category: 'teknologi',
        date: '25 April 2025',
        views: '3.2K',
        comments: 28,
        author: {
            name: 'Budi Santoso',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
    },
    {
        id: 2,
        title: 'Jurusan Kuliah yang Menjanjikan untuk Menghadapi Revolusi Industri 4.0',
        excerpt: 'Revolusi Industri 4.0 membutuhkan tenaga kerja dengan keterampilan khusus. Inilah jurusan kuliah yang akan membantumu sukses.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        category: 'pendidikan',
        date: '23 April 2025',
        views: '2.8K',
        comments: 15,
        author: {
            name: 'Siti Rahma',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
    },
    {
        id: 3,
        title: 'Keterampilan Esensial untuk Karir di Bidang Kesehatan',
        excerpt: 'Bidang kesehatan tidak hanya membutuhkan pengetahuan medis tetapi juga soft skills penting. Simak ulasannya di sini.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        category: 'kesehatan',
        date: '21 April 2025',
        views: '1.9K',
        comments: 7,
        author: {
            name: 'Dr. Ahmad Fauzi',
            avatar: 'https://randomuser.me/api/portraits/men/62.jpg'
        }
    },
    {
        id: 4,
        title: 'Membangun Personal Branding untuk Kemajuan Karir',
        excerpt: 'Personal branding yang kuat dapat membuka pintu karir. Pelajari cara membangun dan mengelola personal brand yang efektif.',
        image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
        category: 'karir',
        date: '18 April 2025',
        views: '4.1K',
        comments: 32,
        author: {
            name: 'Maya Putri',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
        }
    },
    {
        id: 5,
        title: 'Entrepreneurship vs Korporasi: Mana yang Lebih Cocok Untukmu?',
        excerpt: 'Dilema klasik: menjadi entrepreneur atau bekerja di korporasi? Mari kita bahas pro dan kontra dari kedua pilihan karir ini.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        category: 'bisnis',
        date: '15 April 2025',
        views: '3.5K',
        comments: 24,
        author: {
            name: 'Dimas Prabowo',
            avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
        }
    },
    {
        id: 6,
        title: 'Mengembangkan Portofolio Kreativitas yang Menarik Perhatian Pemberi Kerja',
        excerpt: 'Dalam industri kreatif, portofolio adalah jembatan menuju kesuksesan. Pelajari cara membuat portofolio yang mengesankan.',
        image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
        category: 'kreativitas',
        date: '12 April 2025',
        views: '2.1K',
        comments: 13,
        author: {
            name: 'Rini Wijaya',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
        }
    },
];

// Data untuk karir
const careers = [
    {
        id: 1,
        title: 'Data Scientist',
        description: 'Analisis data untuk insight bisnis',
        icon: '📊',
        category: 'teknologi',
        growth: 32
    },
    {
        id: 2,
        title: 'UX Designer',
        description: 'Merancang pengalaman pengguna',
        icon: '🎨',
        category: 'kreativitas',
        growth: 28
    },
    {
        id: 3,
        title: 'Digital Marketer',
        description: 'Strategi pemasaran digital',
        icon: '📱',
        category: 'bisnis',
        growth: 25
    },
    {
        id: 4,
        title: 'Dokter Spesialis',
        description: 'Spesialisasi ilmu kedokteran',
        icon: '⚕️',
        category: 'kesehatan',
        growth: 18
    },
    {
        id: 5,
        title: 'Guru STEM',
        description: 'Pendidikan sains & teknologi',
        icon: '🔬',
        category: 'pendidikan',
        growth: 22
    },
    {
        id: 6,
        title: 'Full-stack Developer',
        description: 'Pengembangan aplikasi web',
        icon: '💻',
        category: 'teknologi',
        growth: 34
    },
    {
        id: 7,
        title: 'Content Creator',
        description: 'Kreasi konten digital',
        icon: '📷',
        category: 'kreativitas',
        growth: 30
    },
    {
        id: 8,
        title: 'Advokat Hukum',
        description: 'Praktisi hukum profesional',
        icon: '⚖️',
        category: 'hukum',
        growth: 15
    },
];

// Data untuk event
const events = [
    {
        id: 1,
        title: 'Webinar: Memulai Karir di Industri Teknologi',
        description: 'Bersama praktisi industri, pelajari langkah-langkah strategis untuk memulai dan mengembangkan karir di dunia teknologi.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        date: '30 April 2025',
        time: '19:00 - 21:00 WIB',
        isFree: true,
        format: 'Online',
        featured: true
    },
    {
        id: 2,
        title: 'Workshop Portfolio Design untuk Kreator Visual',
        description: 'Workshop intensif 2 hari untuk membantu kreator visual membangun portfolio profesional yang menonjolkan keahlian mereka.',
        image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1402&q=80',
        date: '5-6 Mei 2025',
        time: '09:00 - 16:00 WIB',
        isFree: false,
        format: 'Offline',
        featured: false
    },
    {
        id: 3,
        title: 'Career Talk: Peluang Karir di Industri Kesehatan',
        description: 'Diskusi dengan pakar dan profesional kesehatan tentang berbagai jalur karir dan perkembangan terkini di industri kesehatan.',
        image: 'https://images.unsplash.com/photo-1631217868264-e6641e879873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1491&q=80',
        date: '12 Mei 2025',
        time: '13:00 - 15:00 WIB',
        isFree: true,
        format: 'Hybrid',
        featured: false
    },
];

// Data untuk testimonial
const testimonials = [
    {
        id: 1,
        quote: 'CareerAI sangat membantu saya memilih jurusan yang tepat. Hasilnya sangat akurat dan sekarang saya menekuni bidang yang benar-benar sesuai dengan minat dan bakat saya.',
        name: 'Anisa Wijayanti',
        position: 'Mahasiswa Teknik Informatika',
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    {
        id: 2,
        quote: 'Setelah mendapatkan hasil tes karir, saya mendapat gambaran jelas tentang jalur karir yang cocok. Kini saya bekerja di posisi yang sangat sesuai dengan kepribadian saya.',
        name: 'Reza Mahendra',
        position: 'UI/UX Designer',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
        id: 3,
        quote: 'Platform ini tidak hanya memberikan rekomendasi, tapi juga insight mendalam tentang kekuatan dan kelemahan saya. Sangat membantu dalam pengembangan diri.',
        name: 'Dina Puspita',
        position: 'Content Strategist',
        avatar: 'https://randomuser.me/api/portraits/women/53.jpg'
    },
];