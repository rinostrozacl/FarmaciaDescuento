# Casos de Uso - Sistema de Farmacia con Descuento

## Resumen Ejecutivo

Este documento describe los principales casos de uso y escenarios críticos para un sistema de farmacia con descuento. Los casos están categorizados por área funcional y nivel de riesgo.

### Áreas de Impacto Identificadas

1. **Legal**

   - Cumplimiento regulatorio
   - Auditorías
   - Control de ventas controladas

2. **Sanitario**

   - Control de medicamentos
   - Trazabilidad de lotes
   - Gestión de recetas médicas

3. **Operacional**

   - Gestión de inventario
   - Coordinación entre farmacias
   - Gestión de entregas

4. **Financiero**

   - Control de stock
   - Gestión de devoluciones
   - Manejo de precios

5. **Servicio al Cliente**

   - Atención de urgencias
   - Disponibilidad de medicamentos
   - Gestión de entregas

6. **Comercial**
   - Gestión de precios
   - Coordinación entre farmacias

### Áreas Críticas

1. **Regulatorio y Cumplimiento**: Foco en control de ventas y trazabilidad
2. **Operaciones**: Gestión de inventario y coordinación entre farmacias
3. **Servicio al Cliente**: Atención de necesidades y gestión de entregas

---

## 1. Casos Regulatorios

- **Caso 1.1:** Un cliente intenta comprar antibióticos sin receta médica
  - _Impacto:_ Legal y sanitario
  - _Riesgo:_ Alto
- **Caso 1.2:** Una farmacia intenta vender medicamentos con registro sanitario vencido
  - _Impacto:_ Legal y sanitario
  - _Riesgo:_ Alto
- **Caso 1.3:** Se necesita rastrear un lote específico por alerta sanitaria
  - _Impacto:_ Operacional y sanitario
  - _Riesgo:_ Alto

## 2. Casos de Inventario

- **Caso 2.1:** El stock físico no coincide con el sistema
  - _Impacto:_ Operacional y financiero
  - _Riesgo:_ Medio

## 3. Casos de Precios

- **Caso 3.1:** Una farmacia tiene el mismo medicamento a diferente precio que otra
  - _Impacto:_ Comercial
  - _Riesgo:_ Bajo

## 4. Casos Operacionales

- **Caso 4.1:** Un cliente necesita un medicamento urgente fuera de horario
  - _Impacto:_ Servicio al cliente
  - _Riesgo:_ Medio
- **Caso 4.2:** Un cliente devuelve un medicamento por error en el pedido
  - _Impacto:_ Financiero y operacional
  - _Riesgo:_ Bajo

## 5. Casos Técnicos

- **Caso 5.1:** Múltiples usuarios intentan comprar el último stock disponible
  - _Impacto:_ Operacional
  - _Riesgo:_ Medio

## 6. Casos de Servicio

- **Caso 6.1:** Un cliente no encuentra su medicamento habitual
  - _Impacto:_ Servicio al cliente
  - _Riesgo:_ Bajo
- **Caso 6.2:** Se necesita cambiar una entrega a último momento
  - _Impacto:_ Operacional
  - _Riesgo:_ Bajo

## 7. Casos de Coordinación

- **Caso 7.1:** Un pedido debe ser dividido entre varias farmacias
  - _Impacto:_ Operacional
  - _Riesgo:_ Medio
- **Caso 7.2:** Se necesita verificar stock en tiempo real en múltiples locaciones
  - _Impacto:_ Operacional
  - _Riesgo:_ Medio

## 8. Casos de Cumplimiento

- **Caso 8.1:** Se debe reportar la venta de medicamentos controlados
  - _Impacto:_ Legal
  - _Riesgo:_ Alto
- **Caso 8.2:** Una auditoría requiere el historial de ventas específico
  - _Impacto:_ Legal
  - _Riesgo:_ Medio
