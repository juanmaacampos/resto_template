#!/bin/bash

# Script para reemplazar todos los colores con los de Anthony Burger
# Colores: #fed302 (amarillo), #ffffff (blanco), #010101 (negro)

echo "Actualizando colores a la paleta de Anthony Burger..."

# Define los archivos a procesar
files=(
    "src/components/ui/ProductSearch.css"
    "src/components/ui/ProductCard.css"
    "src/components/ui/CategorySlider.css"
    "src/components/ui/SearchBar.css"
    "src/components/ui/CategoryPillsMobile.css"
    "src/components/checkout/CustomerForm.css"
    "src/components/checkout/PaymentSelection.css"
    "src/components/checkout/Cart.css"
    "src/cms-menu/MenuComponents.css"
    "src/cms-menu/ItemVisibilityManager.css"
    "src/cms-menu/StockIndicator.css"
    "src/pages/OrderStatus.css"
    "src/pages/PaymentSuccess.css"
    "src/pages/ProductDetail.css"
    "src/pages/PaymentPending.css"
    "src/pages/PaymentFailure.css"
)

# Reemplazos comunes de colores
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Procesando $file..."
        
        # Reemplazar colores específicos comunes
        sed -i 's/#007bff/var(--store-secondary)/g' "$file"
        sed -i 's/#0056b3/var(--store-primary)/g' "$file"
        sed -i 's/#ffc107/var(--store-secondary)/g' "$file"
        sed -i 's/#e0a800/var(--store-primary)/g' "$file"
        sed -i 's/#28a745/var(--store-secondary)/g' "$file"
        sed -i 's/#218838/var(--store-primary)/g' "$file"
        sed -i 's/#dc3545/var(--store-secondary)/g' "$file"
        sed -i 's/#c82333/var(--store-primary)/g' "$file"
        sed -i 's/#6c757d/var(--store-accent)/g' "$file"
        sed -i 's/#545b62/var(--store-primary)/g' "$file"
        sed -i 's/#495057/var(--store-accent)/g' "$file"
        sed -i 's/#e9ecef/var(--store-secondary)/g' "$file"
        sed -i 's/#f8f9fa/var(--store-primary)/g' "$file"
        sed -i 's/#212529/var(--store-primary)/g' "$file"
        sed -i 's/#343a40/var(--store-primary)/g' "$file"
        sed -i 's/#666/var(--store-accent)/g' "$file"
        sed -i 's/#333/var(--store-primary)/g' "$file"
        sed -i 's/#000/var(--store-primary)/g' "$file"
        sed -i 's/#fff/var(--store-accent)/g' "$file"
        sed -i 's/white/var(--store-accent)/g' "$file"
        sed -i 's/black/var(--store-primary)/g' "$file"
        
        # Colores específicos de teal que aparecen en el template
        sed -i 's/#14b8a6/var(--store-secondary)/g' "$file"
        sed -i 's/#0ea5e9/var(--store-secondary)/g' "$file"
        sed -i 's/#38bdf8/var(--store-secondary)/g' "$file"
        sed -i 's/#2dd4bf/var(--store-secondary)/g' "$file"
        sed -i 's/#00a9a5/var(--store-secondary)/g' "$file"
        sed -i 's/#3a6b7a/var(--store-primary)/g' "$file"
        
        # Colores específicos encontrados en la búsqueda
        sed -i 's/#0f232a/var(--store-primary)/g' "$file"
        sed -i 's/#1e293b/var(--store-primary)/g' "$file"
        sed -i 's/#334155/var(--store-secondary)/g' "$file"
        sed -i 's/#cbd5e1/var(--store-accent)/g' "$file"
        sed -i 's/#e55a2e/var(--store-secondary)/g' "$file"
        sed -i 's/#25D366/var(--store-secondary)/g' "$file"
        
        echo "✓ $file actualizado"
    else
        echo "⚠ $file no encontrado"
    fi
done

echo "¡Actualización de colores completada!"
