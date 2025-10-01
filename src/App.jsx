import { useState } from 'react';
import { Scissors, Menu, X } from 'lucide-react';

const BarberShop = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    < div className="min-h-screen bg-zinc-900" >
      {/* Header */}
      < header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800" >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Scissors className="w-7 h-7 text-amber-500" />
              <span className="text-xl font-bold text-white">Downtown Barber Shop</span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {['services', 'barbers', 'gallery', 'contact'].map((item) => (
                <button
                  key={item}
                  className="text-gray-300 hover:text-amber-500 transition-colors capitalize font-medium cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:1234567890" className="text-gray-300 hover:text-amber-500 transition-colors">
                (123) 456-7890
              </a>
              <button className="px-6 py-2 bg-amber-500 text-zinc-900 font-semibold rounded cursor-pointer transition-all hover:bg-amber-400">
                Book Now
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white cursor-pointer">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-zinc-800">
              {['services', 'barbers', 'gallery', 'contact'].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left py-3 text-gray-300 hover:text-amber-500 capitalize cursor-pointer"
                >
                  {item}
                </button>
              ))}
              <a href="tel:4165550123" className="block py-3 text-amber-500 font-semibold">
                Call (416) 555-0123
              </a>
            </div>
          )}
        </div>
      </header >

      {/* Temporary content */}
      < div className="pt-32 px-6 text-white text-center" >
        <h1 className="text-4xl font-bold">Header text</h1>
        <p className="mt-4 text-gray-400">Header description text</p>
      </div >
    </div >
  );
}

export default BarberShop;