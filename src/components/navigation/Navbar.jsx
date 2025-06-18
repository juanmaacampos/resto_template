import { useState, useEffect } from 'react';
import { FaHome, FaStore, FaMapMarkerAlt, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import '../../styles/navigation/Navbar.css';

const Navbar = ({ onCartClick, itemCount }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Show navbar after header
      setIsVisible(scrollY > headerHeight * 0.8);
      
      // Update active section
      const sections = ['home', 'menu', 'location', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', icon: FaHome, label: 'Inicio' },
    { id: 'menu', icon: FaStore, label: 'Productos' },
    { id: 'location', icon: FaMapMarkerAlt, label: 'Ubicación' },
    { id: 'contact', icon: FaEnvelope, label: 'Contacto' }
  ];

  return (
    <nav className={`navbar ${isVisible ? 'navbar-visible' : ''}`}>
      <div className="navbar-container">
        <div className="nav-items">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`nav-item ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollToSection(id)}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </div>
        
        {/* Botón del carrito en la derecha */}
        <button 
          className="nav-item cart-nav-item"
          onClick={onCartClick}
        >
          <div className="cart-icon-container">
            <FaShoppingCart className="nav-icon" />
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </div>
          <span className="nav-label">Carrito</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
