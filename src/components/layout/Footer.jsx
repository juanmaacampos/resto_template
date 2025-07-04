import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import '../../styles/layout/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>ANTHONY BURGER</h3>
            <p>Las mejores hamburguesas artesanales</p>
          </div>
          
          <div className="footer-social">
            <h4>Seguinos:</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-link">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          
          <div className="footer-contact">
            <h4>Contacto</h4>
            <p>Av. Principal 123</p>
            <p>+54 11 1234-5678</p>
            <p>info@anthonyburger.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 ANTHONY BURGER. Creado por <a href="https://jmcdev.site" target="_blank" rel="noopener noreferrer">JMCDEV</a>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
