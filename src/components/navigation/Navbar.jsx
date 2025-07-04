import { useState, useEffect } from 'react';
import { FaStore, FaHome, FaBoxOpen, FaMapMarkerAlt, FaEnvelope, FaShoppingCart, FaBars, FaSearch } from 'react-icons/fa';
import { ProductSearch } from '../ui';
import { Link } from 'react-router-dom';
import anthonyLogo from '../../assets/Anthony logo.svg';
import '../../styles/navigation/NavbarModern.css';

const Navbar = ({ onCartClick, itemCount, hideMainNavLinks, hideNavLinks }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = window.innerHeight;
      const scrollY = window.scrollY;
      setIsVisible(scrollY > headerHeight * 0.8 || isDesktop);
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
  }, [isDesktop]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', icon: FaHome, label: 'Inicio' },
    { id: 'menu', icon: FaBoxOpen, label: 'Menú' },
    { id: 'location', icon: FaMapMarkerAlt, label: 'Ubicación' },
    { id: 'contact', icon: FaEnvelope, label: 'Contacto' }
  ];

  return (
    <nav className="navbar-modern">
      <div className="navbar-modern-container">
        {/* Logo */}
        <Link to="/" className="navbar-modern-logo">
          <img 
            src={anthonyLogo} 
            alt="Anthony Burger" 
            className="navbar-modern-logo-img"
          />
        </Link>
        {/* Desktop menu */}
        <div className="navbar-modern-menu">
          {!hideMainNavLinks && !hideNavLinks && navItems.map(({ id, icon: Icon, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="navbar-modern-link"
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Icon className="navbar-modern-link-icon" /> {label}
            </a>
          ))}
        </div>
        {/* Search + Cart + Mobile button */}
        <div className="navbar-modern-actions">
          <div className="navbar-modern-search-desktop">
            <ProductSearch />
          </div>
          <a href="#" className="navbar-modern-cart" onClick={onCartClick}>
            <FaShoppingCart className="navbar-modern-cart-icon" /> Carrito
            {itemCount > 0 && <span className="navbar-modern-cart-badge">{itemCount}</span>}
          </a>
          <button className="navbar-modern-mobile-btn" onClick={() => setMobileMenuOpen(v => !v)}>
            <FaBars className="navbar-modern-mobile-icon" />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="navbar-modern-mobile-menu">
          <div className="navbar-modern-search-mobile">
            <ProductSearch />
          </div>
          <div className="navbar-modern-mobile-links">
            {!hideMainNavLinks && !hideNavLinks && navItems.map(({ id, icon: Icon, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="navbar-modern-link"
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                  setMobileMenuOpen(false);
                }}
              >
                <Icon className="navbar-modern-link-icon" /> {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
