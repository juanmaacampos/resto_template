import React, { useRef } from 'react';
import { FaUtensils } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ 
  item, 
  onAddToCart, 
  showImage = true, 
  showPrice = true, 
  showDescription = true,
  terminology = {},
  businessId = null,
  categoryId = null
}) => {
  const cardRef = useRef(null);

  const handleCardClick = (e) => {
    // No hacer nada al hacer click en la card, solo agregar al carrito con el botón
    e.preventDefault();
  };

  const imageSource = item.imageUrl || item.image;

  // Funciones helper para el estado del item
  const isItemAvailable = () => {
    if (item.isHidden) return false;
    if (item.isAvailable === false) return false;
    return true;
  };

  const getButtonClass = () => {
    if (item.isHidden) return 'product-card-button disabled';
    if (!isItemAvailable()) return 'product-card-button disabled';
    return 'product-card-button';
  };

  const getButtonText = () => {
    if (item.isHidden) return 'No disponible';
    if (item.isAvailable === false) return 'No disponible';
    return terminology.addToCart || 'Agregar al Carrito';
  };

  return (
    <div 
      ref={cardRef} 
      className={`product-card ${item.isHidden ? 'hidden' : ''}`}
      onClick={handleCardClick}
    >
      {showImage && (
        <div className="product-card-image">
          {imageSource ? (
            <img src={imageSource} alt={item.name} />
          ) : (
            <div className="product-card-placeholder">
              <FaUtensils />
            </div>
          )}
        </div>
      )}
      
      <div className="product-card-content">
        <div className="product-card-header">
          <h3 className="product-card-title">{item.name}</h3>
          {showPrice && (
            <span className="product-card-price">${item.price}</span>
          )}
        </div>
        
        {showDescription && item.description && (
          <p className="product-card-description">{item.description}</p>
        )}
        
        <div className="product-card-footer">
          {onAddToCart && (
            <button 
              className={getButtonClass()}
              onClick={() => !item.isHidden && isItemAvailable() && onAddToCart(item)}
              disabled={item.isHidden || !isItemAvailable()}
            >
              {getButtonText()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
