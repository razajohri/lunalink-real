import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleOnboardNow = () => {
    window.location.href = '/auth';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl text-blue-600">
            <span className="flex items-center gap-2">
              <img
                src="/lovable-uploads/4724f8bd-cc0b-401b-80fe-9f041d72c595.png"
                alt="LunaLink AI Logo"
                className="w-10 h-10 object-contain"
              />
              LunaLink AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => window.location.href = "https://youtube.com/playlist?list=PLEi7sibV01icwLju2G0z5XX8PdqMa968&si=YNPaseq6LxMuRn9"}
              className="bg-primary/10 text-primary border border-primary hover:bg-primary/20 transition-colors"
            >
              Call Demo
            </Button>
            <Button
              onClick={() => window.open('https://youtube.com/playlist?list=PLEi7sibV01icwLju2cG0z5XX8PdqMa968&si=-1cocul_56u_jR-y', '_blank')}
              className="bg-primary/10 text-primary border border-primary hover:bg-primary/20 transition-colors"
            >
              Demo Video
            </Button>
            <Button
              onClick={handleOnboardNow}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Login/Signup
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-sm">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              FAQ
            </button>
            <Button
  size="lg"
  className="text-lg px-8 py-6 bg-primary/10 text-primary border border-primary hover:bg-primary/20 shadow-lg"
  onClick={() => window.location.href = "https://www.youtube.com/playlist?list=PLEi7sibV01icwLju2cG0z5XX8PdqMa968"}
  >
  Call Demo
</Button>
            <Button
              onClick={() => window.open('https://youtube.com/playlist?list=PLEi7sibV01icwLju2cG0z5XX8PdqMa968&si=-1cocul_56u_jR-y', '_blank')}
              className="bg-primary/10 text-primary border border-primary hover:bg-primary/20 transition-colors"
            >
              Demo Video
            </Button>
            <Button
              onClick={handleOnboardNow}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Login/Signup
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
