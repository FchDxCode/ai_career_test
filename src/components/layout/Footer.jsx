import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulasi pengiriman data - ganti dengan API call yang sesungguhnya
        setTimeout(() => {
            setIsSubmitting(false);
            setSubscribed(true);
            setEmail('');
            // Reset pesan sukses setelah 5 detik
            setTimeout(() => setSubscribed(false), 5000);
        }, 1500);
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top footer area with logo and subscription */}
                <div className="pt-12 pb-8 border-b border-blue-700/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Logo and tagline */}
                        <div>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="flex items-center mb-4"
                            >
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                                    CareerAI
                                </div>
                            </motion.div>
                            <p className="text-blue-200 max-w-md">
                                Platform modern yang membantu kamu menemukan jurusan kuliah dan karir yang sesuai menggunakan kecerdasan buatan.
                            </p>
                            <div className="mt-6 flex space-x-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-300 hover:text-white transition-colors"
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="sr-only">{social.name}</span>
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter subscription */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Ikuti Update Terbaru</h3>
                            <p className="text-blue-200 mb-4">
                                Dapatkan informasi tentang fitur baru dan tips karir terbaru.
                            </p>
                            {subscribed ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-900/40 rounded-lg text-green-200"
                                >
                                    Terima kasih! Email kamu telah didaftarkan.
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-2">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Alamat email kamu"
                                            required
                                            className="px-4 py-2.5 flex-grow bg-blue-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder:text-blue-300/50"
                                        />
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`px-4 py-2.5 font-medium rounded-lg ${
                                                isSubmitting
                                                    ? 'bg-blue-600/50 cursor-wait'
                                                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400'
                                            }`}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Mendaftar...
                                                </span>
                                            ) : (
                                                'Berlangganan'
                                            )}
                                        </motion.button>
                                    </div>
                                    <p className="text-xs text-blue-300/50">
                                        Kami tidak akan mengirimkan spam. Kamu dapat berhenti berlangganan kapan saja.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Middle footer with links */}
                <div className="py-8 border-b border-blue-700/30">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {footerNavigation.map((column) => (
                            <div key={column.title}>
                                <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-blue-300">
                                    {column.title}
                                </h3>
                                <ul className="space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.name}>
                                            <motion.a
                                                href={link.href}
                                                whileHover={{ x: 5 }}
                                                className="text-blue-200 hover:text-white transition-colors text-sm flex items-center"
                                            >
                                                {link.name}
                                                {link.badge && (
                                                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-blue-700 text-blue-200">
                                                        {link.badge}
                                                    </span>
                                                )}
                                            </motion.a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom footer copyright */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-sm text-blue-300 mb-4 sm:mb-0">
                        &copy; {currentYear} CareerAI. Seluruh hak cipta dilindungi.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-xs text-blue-300 hover:text-white transition-colors">
                            Syarat Penggunaan
                        </a>
                        <a href="#" className="text-xs text-blue-300 hover:text-white transition-colors">
                            Kebijakan Privasi
                        </a>
                        <a href="#" className="text-xs text-blue-300 hover:text-white transition-colors">
                            Kebijakan Cookie
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Ikon media sosial
const socialLinks = [
    {
        name: 'Instagram',
        href: '#',
        icon: (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        href: '#',
        icon: (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'Twitter',
        href: '#',
        icon: (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
            </svg>
        ),
    },
];

// Link navigasi footer
const footerNavigation = [
    {
        title: 'Produk',
        links: [
            { name: 'Tes Karir', href: '/test-karir' },
            { name: 'Tes Jurusan', href: '/test-jurusan' },
            { name: 'Konsultasi AI', href: '#', badge: 'Baru' },
            { name: 'Panduan Studi', href: '#' },
        ],
    },
    {
        title: 'Perusahaan',
        links: [
            { name: 'Tentang Kami', href: '#' },
            { name: 'Tim Kami', href: '#' },
            { name: 'Karir', href: '#' },
            { name: 'Kontak', href: '#' },
        ],
    },
    {
        title: 'Informasi',
        links: [
            { name: 'Blog', href: '#' },
            { name: 'Panduan', href: '#' },
            { name: 'FAQ', href: '#' },
            { name: 'Dukungan', href: '#' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { name: 'Syarat Penggunaan', href: '#' },
            { name: 'Kebijakan Privasi', href: '#' },
            { name: 'Kebijakan Cookie', href: '#' },
            { name: 'Perlindungan Data', href: '#' },
        ],
    },
];