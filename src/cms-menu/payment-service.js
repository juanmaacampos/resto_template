/**
 * Payment Service for MercadoPago Integration
 * Frontend service to interact with Cloud Functions
 */

import { getFunctions, httpsCallable } from 'firebase/functions';
import { globalFirebaseManager } from './firebase-manager.js';

export class PaymentService {
  constructor() {
    this.functions = null;
    this.initialized = false;
  }

  async _ensureInitialized() {
    if (this.initialized) return;

    try {
      const { app } = await globalFirebaseManager.initialize();
      this.functions = getFunctions(app);
      this.initialized = true;
      console.log('✅ PaymentService initialized');
    } catch (error) {
      console.error('❌ Failed to initialize PaymentService:', error);
      throw error;
    }
  }

  /**
   * Crear preferencia de pago en MercadoPago usando Cloud Functions
   * @param {Object} orderData - Datos del pedido
   * @returns {Promise<Object>} Respuesta con init_point para redirección
   */
  async createMercadoPagoPreference(orderData) {
    try {
      await this._ensureInitialized();

      console.log('🔄 Creating MercadoPago preference...', orderData);

      // Validar datos requeridos
      this._validateOrderData(orderData);

      try {
        // Llamar a Cloud Function (onCall)
        const createPreference = httpsCallable(this.functions, 'createMercadoPagoPreference');
        
        const result = await createPreference({
          businessId: orderData.businessId, // ID del negocio para Cloud Function
          items: orderData.items,
          customer: orderData.customer,
          totalAmount: orderData.totalAmount,
          orderId: orderData.orderId,
          backUrls: orderData.backUrls,
          notes: orderData.notes || ''
        });

        if (result.data.success) {
          console.log('✅ MercadoPago preference created:', result.data);
          return {
            success: true,
            init_point: result.data.init_point,
            preference_id: result.data.preference_id,
            order_id: result.data.order_id
          };
        } else {
          throw new Error('Failed to create payment preference');
        }
      } catch (firebaseError) {
        console.warn('⚠️ Firebase callable failed, trying HTTP fallback:', firebaseError);
        
        // Fallback to HTTP function
        const response = await fetch('https://us-central1-cms-menu-7b4a4.cloudfunctions.net/createMercadoPagoPreferenceHTTP', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            businessId: orderData.businessId, // ID del negocio para HTTP function
            items: orderData.items,
            payer: orderData.customer,
            totalAmount: orderData.totalAmount,
            orderId: orderData.orderId,
            backUrls: orderData.backUrls,
            notes: orderData.notes || ''
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP function failed: ${errorData.message || response.statusText}`);
        }

        const result = await response.json();
        console.log('✅ MercadoPago preference created via HTTP:', result);
        return result;
      }

    } catch (error) {
      console.error('❌ Error creating MercadoPago preference:', error);
      throw new Error(`Payment error: ${error.message}`);
    }
  }

  /**
   * Generar URLs de retorno para MercadoPago
   * @param {string} baseUrl - URL base de la aplicación
   * @param {string} orderId - ID del pedido
   * @returns {Object} URLs de retorno
   */
  generateBackUrls(baseUrl, orderId) {
    // Usar siempre la URL de producción para las URLs de retorno
    const prodBaseUrl = "https://juanmaacampos.github.io/restaurant_template";
    
    // MercadoPago reemplaza automáticamente estos placeholders
    return {
      success: `${prodBaseUrl}/payment/success?order=${orderId}&payment_id={{payment_id}}&status={{status}}&collection_status={{collection_status}}&source=mp_redirect`,
      pending: `${prodBaseUrl}/payment/pending?order=${orderId}&payment_id={{payment_id}}&status={{status}}&collection_status={{collection_status}}&source=mp_redirect`,
      failure: `${prodBaseUrl}/payment/failure?order=${orderId}&payment_id={{payment_id}}&status={{status}}&collection_status={{collection_status}}&source=mp_redirect`
    };
  }

  /**
   * Validar datos del pedido antes de enviar
   * @private
   */
  _validateOrderData(orderData) {
    const required = ['businessId', 'items', 'customer', 'totalAmount', 'orderId', 'backUrls'];
    
    for (const field of required) {
      if (!orderData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validar items
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      throw new Error('Items must be a non-empty array');
    }

    // Validar customer
    if (!orderData.customer.name || !orderData.customer.phone) {
      throw new Error('Customer name and phone are required');
    }

    // Validar total
    if (typeof orderData.totalAmount !== 'number' || orderData.totalAmount <= 0) {
      throw new Error('Total amount must be a positive number');
    }

    // Validar URLs de retorno
    const { success, pending, failure } = orderData.backUrls;
    if (!success || !pending || !failure) {
      throw new Error('All back URLs (success, pending, failure) are required');
    }
  }
}

// Export singleton instance
export const paymentService = new PaymentService();
export default paymentService;
