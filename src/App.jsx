import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Scissors, Star, Menu, X } from 'lucide-react';

const BarberShop = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&h=800&fit=crop",
      title: "Classic Cuts",
      subtitle: "Timeless style, modern precision"
    },
    {
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1200&h=800&fit=crop",
      title: "Expert Beard Work",
      subtitle: "Shape and style with care"
    },
    {
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&h=800&fit=crop",
      title: "Traditional Shaves",
      subtitle: "Hot towel luxury experience"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
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
              <a href="tel:1234567890" className="block py-3 text-amber-500 font-semibold">
                Call (123) 456-7890
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Slideshow */}
      <section className="relative h-screen mt-16">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-2xl md:text-3xl mb-12 text-gray-300">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-amber-500 text-zinc-900 font-bold text-lg rounded cursor-pointer transition-all hover:bg-amber-400">
                Book Appointment
              </button>
              <a
                href="tel:1234567890"
                className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded cursor-pointer transition-all hover:bg-white/10 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="w-3 h-3 rounded-full transition-all cursor-pointer"
              style={{
                background: currentSlide === index ? '#f59e0b' : '#52525b'
              }}
            />
          ))}
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-amber-500 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-around items-center gap-6 text-zinc-900">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6" />
              <div>
                <p className="font-bold">Walk-ins Welcome</p>
                <p className="text-sm">Mon-Sat: 9AM - 7PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <div>
                <p className="font-bold">Downtown Toronto</p>
                <p className="text-sm">123 Street Name</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 fill-current" />
              <div>
                <p className="font-bold">4.9/5 Rating</p>
                <p className="text-sm">500+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BarberShop;