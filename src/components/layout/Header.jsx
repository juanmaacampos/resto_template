import { useRef } from 'react';
import '../../styles/layout/Header.css';
import anthonyLogo from '../../assets/Anthony logo.svg';

const Header = () => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  const scrollToProducts = () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header ref={headerRef} className="header" id="home">
      <div className="header-bg"></div>
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <img ref={titleRef} className="header-logo" src={anthonyLogo} alt="Anthony Logo" />
            <p ref={subtitleRef} className="header-subtitle">
              Hamburguesas Artesanales
            </p>
            <button ref={ctaRef} className="btn-primary header-cta" onClick={scrollToProducts}>
              Ver Menu
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
