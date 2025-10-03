import { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Clock, Instagram, Facebook, Scissors, Star, ChevronRight, Menu, X } from 'lucide-react';

const BarberShop = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const mobileMenuRef = useRef(null);

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

  const services = [
    {
      name: "Signature Cut",
      price: "$35",
      duration: "30 min",
      description: "Precision haircut with consultation, wash, and style",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop"
    },
    {
      name: "Beard Trim & Shape",
      price: "$25",
      duration: "20 min",
      description: "Expert beard sculpting and hot towel treatment",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop"
    },
    {
      name: "Hot Towel Shave",
      price: "$40",
      duration: "40 min",
      description: "Traditional straight razor shave with premium products",
      image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=300&fit=crop"
    },
    {
      name: "Cut + Beard Combo",
      price: "$55",
      duration: "50 min",
      description: "Full service haircut and beard grooming package",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop"
    }
  ];

  const barbers = [
    {
      name: "Mike Thompson",
      specialty: "Classic Cuts & Traditional Shaves",
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face"
    },
    {
      name: "Tony Rodriguez",
      specialty: "Modern Fades & Beard Design",
      experience: "8 years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
    },
    {
      name: "Sam Wilson",
      specialty: "Precision Styling & Color",
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header ref={mobileMenuRef} className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
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
                  onClick={() => scrollToSection(item)}
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
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2 bg-amber-500 text-zinc-900 font-semibold rounded cursor-pointer transition-all hover:bg-amber-400"
              >
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
                  onClick={() => scrollToSection(item)}
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
              <button
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 bg-amber-500 text-zinc-900 font-bold text-lg rounded cursor-pointer transition-all hover:bg-amber-400"
              >
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
                <p className="text-sm">123 Main Street</p>
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

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-400">Premium grooming for the modern gentleman</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-zinc-800 rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105"
                onClick={() => setSelectedService(selectedService === index ? null : index)}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-amber-500">{service.price}</p>
                        <p className="text-sm text-gray-400">{service.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="mt-4 text-amber-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Book This Service <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers */}
      <section id="barbers" className="py-24 px-6 bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Expert Barbers</h2>
            <p className="text-xl text-gray-400">Skilled craftsmen dedicated to your style</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {barbers.map((barber, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{barber.name}</h3>
                <p className="text-amber-500 font-semibold mb-2">{barber.specialty}</p>
                <p className="text-gray-400">{barber.experience} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section id="gallery" className="py-24 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Recent Work</h2>
            <p className="text-xl text-gray-400 flex items-center justify-center gap-2">
              Follow us on Instagram <Instagram className="w-5 h-5 text-amber-500" />
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400",
              "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400",
              "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400",
              "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400",
              "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400",
              "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400",
              "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=400",
              "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400"
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-zinc-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">What Clients Say</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-xl text-gray-400">Rated 4.9/5 on Google</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "John Martinez",
                text: "Best barbershop in Toronto. Mike has been cutting my hair for 5 years and I wouldn't trust anyone else. Professional, friendly, and always delivers.",
                initial: "JM",
                rating: 5
              },
              {
                name: "David Chen",
                text: "The hot towel shave is incredible. Tony takes his time and the experience is worth every penny. This place sets the standard for barbering.",
                initial: "DC",
                rating: 5
              },
              {
                name: "Robert Kim",
                text: "Finally found a barber who understands what I want. Sam is a master at fades and the shop atmosphere is perfect. Always leave looking sharp.",
                initial: "RK",
                rating: 5
              },
              {
                name: "Marcus Johnson",
                text: "Walk-in friendly and never disappointed. The attention to detail is what sets them apart. Fair prices for premium quality work.",
                initial: "MJ",
                rating: 4
              }
            ].map((review, i) => (
              <div key={i} className="bg-zinc-900 p-8 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-zinc-900 font-bold text-lg">
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-bold text-white">{review.name}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-600" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Visit Us Today</h2>
          <p className="text-xl text-gray-400 mb-12">Walk-ins welcome or call ahead to reserve your spot</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-zinc-800 p-8 rounded-lg">
              <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Location</h3>
              <p className="text-gray-400">123 Main Street<br />Toronto, ON M5V 1A1</p>
            </div>
            <div className="bg-zinc-800 p-8 rounded-lg">
              <Phone className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Phone</h3>
              <a href="tel:1234567890" className="text-amber-500 hover:text-amber-400">
                (123) 456-7890
              </a>
            </div>
            <div className="bg-zinc-800 p-8 rounded-lg">
              <Clock className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Hours</h3>
              <p className="text-gray-400">Mon-Sat: 9AM - 7PM<br />Sunday: Closed</p>
            </div>
          </div>

          <a
            href="tel:1234567890"
            className="inline-flex items-center gap-3 px-12 py-5 bg-amber-500 text-zinc-900 font-bold text-xl rounded cursor-pointer transition-all hover:bg-amber-400"
          >
            <Phone className="w-6 h-6" />
            Call (123) 456-7890
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Scissors className="w-6 h-6 text-amber-500" />
              <span className="text-white font-bold">Downtown Barber Shop</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-amber-500 transition-colors cursor-pointer">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors cursor-pointer">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm">© 2025 Downtown Barber Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BarberShop;