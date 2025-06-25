import React from 'react';
import { useMenu } from '../context/MenuContext';
import { FaSyncAlt, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

export const ConnectionStatus = () => {
  const { isConnected, isLoading, error } = useMenu();

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: '#f39c12',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 1000
      }}>
        <FaSyncAlt style={{ marginRight: 6 }} /> Conectando a Firebase...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: '#e74c3c',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 1000
      }}>
        <FaTimesCircle style={{ marginRight: 6 }} /> Error: {error}
      </div>
    );
  }

  if (isConnected) {
    return (
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: '#27ae60',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 1000
      }}>
        <FaCheckCircle style={{ marginRight: 6 }} /> Conectado a Firebase
      </div>
    );
  }

  return null;
};
