
import { ShoppingBag } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/lovable-uploads/89362e3a-2e1d-43b3-9441-d10441974e44.png"
                alt="LunaLink AI Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">LunaLink AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Recover more abandoned carts with AI-powered voice calls that convert.
              Built specifically for Shopify merchants generating $5,000+ monthly revenue.
            </p>
            <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg inline-block">
              <ShoppingBag className="text-blue-400" />
              <span>Available on Shopify App Store</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { label: "Documentation", url: "#" },
                { label: "API Reference", url: "#" },
                { label: "Case Studies", url: "#" },
                { label: "Blog", url: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", url: "#" },
                { label: "Contact", url: "#" },
                { label: "Privacy Policy", url: "#" },
                { label: "Terms of Service", url: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} LunaLink AI. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {[
              { label: "Twitter", url: "#" },
              { label: "LinkedIn", url: "#" },
              { label: "Facebook", url: "#" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
