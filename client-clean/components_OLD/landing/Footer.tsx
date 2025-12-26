export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">ChatPilot Education</h3>
                        <p className="text-sm leading-relaxed">
                            Built to help Indian students become job-ready through structured learning, testing, and interview-focused training.
                        </p>
                        <p className="text-sm font-bold text-purple-400 mt-4">
                            Skills create jobs — not promises.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#features" className="hover:text-purple-400 transition-colors">Program Features</a></li>
                            <li><a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a></li>
                            <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                            <li><a href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
                        <div className="space-y-2 text-sm">
                            <p>📧 Email: <a href="mailto:support@chatpilot.co.in" className="hover:text-purple-400 transition-colors">support@chatpilot.co.in</a></p>
                            <p>🌐 Website: <a href="https://edu.chatpilot.co.in" className="hover:text-purple-400 transition-colors">edu.chatpilot.co.in</a></p>
                            <p>📍 Based in Pondicherry, India</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm">© 2026 ChatPilot Education. All rights reserved.</p>
                    <div className="flex gap-4 text-sm">
                        <a href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
                        <a href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
