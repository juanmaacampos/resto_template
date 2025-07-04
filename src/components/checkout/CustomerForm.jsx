import { useState } from 'react';
import './CustomerForm.css';
import { FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaStickyNote, FaStore, FaTruck } from 'react-icons/fa';

const CustomerForm = ({ onSubmit, loading, paymentMethod }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryOption: paymentMethod === 'cash' ? 'pickup' : 'pickup', // 'pickup' o 'delivery'
    address: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDeliveryOptionChange = (e) => {
    // Si es efectivo, siempre mantener pickup
    if (paymentMethod === 'cash') {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      deliveryOption: e.target.value,
      // Limpiar dirección si se selecciona retiro
      address: e.target.value === 'pickup' ? '' : prev.address
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="customer-form scrollable-content">
      <h3>Información de Contacto</h3>
      
      <div className="form-group">
        <label htmlFor="name"><FaUser style={{ marginRight: 6, color: 'var(--secondary-color)' }} /> Nombre completo *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          disabled={loading}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone"><FaPhoneAlt style={{ marginRight: 6, color: 'var(--secondary-color)' }} /> Teléfono *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+54 11 1234-5678"
          className={errors.phone ? 'error' : ''}
          disabled={loading}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email"><FaEnvelope style={{ marginRight: 6, color: 'var(--secondary-color)' }} /> Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          disabled={loading}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Opción de entrega */}
      {paymentMethod === 'cash' ? (
        <div className="form-group delivery-info">
          <label className="delivery-label">Opción de entrega:</label>
          <div className="cash-delivery-notice" style={{ 
            padding: '1rem', 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px', 
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            <FaStore style={{ marginRight: '0.5rem', color: 'var(--secondary-color)' }} />
            <span style={{ color: 'var(--secondary-color)', fontWeight: '500' }}>
              El pago en efectivo solo está disponible para retiro en local
            </span>
          </div>
        </div>
      ) : (
        <div className="form-group delivery-options">
          <label className="delivery-label">Opción de entrega:</label>
          <div className="delivery-choice" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <label 
              className="radio-option" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                border: '2px solid',
                borderColor: formData.deliveryOption === 'pickup' ? '#009688' : '#ddd',
                borderRadius: '8px',
                backgroundColor: formData.deliveryOption === 'pickup' ? '#e0f2f1' : '#fff',
                transition: 'all 0.3s ease'
              }}
            >
              <input
                type="radio"
                name="deliveryOption"
                value="pickup"
                checked={formData.deliveryOption === 'pickup'}
                onChange={handleDeliveryOptionChange}
                style={{ marginRight: '0.5rem' }}
              />
              <FaStore style={{ marginRight: '0.5rem', color: 'var(--secondary-color)' }} /> Retiro en local
            </label>
            <label 
              className="radio-option" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                border: '2px solid',
                borderColor: formData.deliveryOption === 'delivery' ? '#009688' : '#ddd',
                borderRadius: '8px',
                backgroundColor: formData.deliveryOption === 'delivery' ? '#e0f2f1' : '#fff',
                transition: 'all 0.3s ease'
              }}
            >
              <input
                type="radio"
                name="deliveryOption"
                value="delivery"
                checked={formData.deliveryOption === 'delivery'}
                onChange={handleDeliveryOptionChange}
                style={{ marginRight: '0.5rem' }}
              />
              <FaTruck style={{ marginRight: '0.5rem', color: 'var(--secondary-color)' }} /> Envío a domicilio
            </label>
          </div>
        </div>
      )}

      {/* Campo de dirección - solo si se selecciona envío a domicilio y NO es efectivo */}
      {formData.deliveryOption === 'delivery' && paymentMethod !== 'cash' && (
        <div className="form-group">
          <label htmlFor="address"><FaMapMarkerAlt style={{ marginRight: 6, color: 'var(--secondary-color)' }} /> Dirección *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
            rows="3"
            required
            placeholder="Ingresa tu dirección completa"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="notes"><FaStickyNote style={{ marginRight: 6, color: 'var(--secondary-color)' }} /> Notas adicionales</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Instrucciones especiales, alergias, etc."
          disabled={loading}
          rows="3"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Procesando...' : 'Proceder al Pago'}
      </button>
    </form>
  );
};

export default CustomerForm;
