# Wireframe: Validación de Tickets (Farmacia)

```
+----------------------------------------------------------------------+
|                                                                      |
| [LOGO] Farmacia Cruz Verde                         [Mi Cuenta ▼]     |
|                                                    [Cerrar Sesión]    |
+----------------------------------------------------------------------+
|                                                                      |
| +-------------+  +--------------------------------------------------+ |
| | Dashboard   |  | Dashboard > Tickets > Validación                 | |
| | Productos   |  +--------------------------------------------------+ |
| | Inventario  |  |                                                  | |
| | Tickets     |  | Validación de Tickets                            | |
| | Ventas      |  |                                                  | |
| | Reportes    |  | +------------------------------------------+     | |
| | Sucursales  |  | |                                          |     | |
| | Configuración|  | |               [ICONO CÁMARA]            |     | |
| |             |  | |                                          |     | |
| |             |  | |        Escanear Código QR/Barcode        |     | |
| |             |  | |                                          |     | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | O ingresar código manualmente:                   | |
| |             |  |                                                  | |
| |             |  | [                    ] [Validar]                 | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | |                                          |     | |
| |             |  | |             Historial Reciente           |     | |
| |             |  | |                                          |     | |
| |             |  | | Ticket #12345 - Juan Pérez - $12.030     |     | |
| |             |  | | Validado: 24/04/2025 - 14:30             |     | |
| |             |  | |                                          |     | |
| |             |  | | Ticket #12342 - María González - $8.990  |     | |
| |             |  | | Validado: 24/04/2025 - 11:15             |     | |
| |             |  | |                                          |     | |
| |             |  | | Ticket #12339 - Pedro Soto - $15.490     |     | |
| |             |  | | Validado: 24/04/2025 - 09:45             |     | |
| |             |  | |                                          |     | |
| |             |  | | [Ver Historial Completo]                 |     | |
| |             |  | |                                          |     | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| +-------------+  +--------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
| © 2025 FarmaciaDescuento | Términos y Condiciones | Privacidad       |
|                                                                      |
+----------------------------------------------------------------------+

+----------------------------------------------------------------------+
|                                                                      |
|                 MODAL: DETALLE DE TICKET ESCANEADO                   |
|                                                                      |
| +------------------------------------------------------------------+ |
| | Ticket #12345                                      [X] Cerrar    | |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | ✓ Ticket Válido                                                  | |
| |                                                                  | |
| | Cliente: Juan Pérez                                              | |
| | Fecha de generación: 23/04/2025 - 15:30                          | |
| | Válido hasta: 25/04/2025 - 23:59                                 | |
| |                                                                  | |
| | Productos:                                                       | |
| | +--------------------------------------------------------------+ | |
| | | Producto          | Cantidad | Precio Unit. | Subtotal       | | |
| | |-------------------|----------|--------------|---------------| | |
| | | Paracetamol 500mg | 1        | $3.590       | $3.590         | | |
| | | Ibuprofeno 400mg  | 2        | $4.220       | $8.440         | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Total: $12.030                                                   | |
| |                                                                  | |
| | Confirmar entrega de productos:                                  | |
| |                                                                  | |
| | [CANCELAR]                          [CONFIRMAR ENTREGA]          | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+

+----------------------------------------------------------------------+
|                                                                      |
|                 MODAL: CONFIRMACIÓN DE ENTREGA                       |
|                                                                      |
| +------------------------------------------------------------------+ |
| | Confirmación                                      [X] Cerrar     | |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | ✓ Ticket #12345 validado correctamente                           | |
| |                                                                  | |
| | Los productos han sido entregados a Juan Pérez.                  | |
| | El inventario ha sido actualizado automáticamente.               | |
| |                                                                  | |
| | ¿Desea imprimir comprobante?                                     | |
| |                                                                  | |
| | [NO]                                    [IMPRIMIR COMPROBANTE]   | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+

+----------------------------------------------------------------------+
|                                                                      |
|                 MODAL: TICKET INVÁLIDO                               |
|                                                                      |
| +------------------------------------------------------------------+ |
| | Error de Validación                                [X] Cerrar    | |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | ❌ Ticket Inválido                                                | |
| |                                                                  | |
| | Motivo: Ticket #12340 ya ha sido utilizado.                      | |
| | Fecha de uso: 22/04/2025 - 16:45                                 | |
| |                                                                  | |
| | Si el cliente tiene alguna duda, por favor diríjalo              | |
| | al soporte de FarmaciaDescuento.                                 | |
| |                                                                  | |
| | [CERRAR]                                                         | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
```

## Notas Adicionales

### Componentes Principales
1. **Barra Superior**: Logo, nombre de la farmacia y opciones de cuenta
2. **Menú Lateral**: Navegación principal del panel de farmacia
3. **Breadcrumbs**: Navegación jerárquica para ubicar al usuario
4. **Escáner de Códigos**: Área para escanear códigos QR o barcode
5. **Entrada Manual**: Campo para ingresar códigos manualmente
6. **Historial Reciente**: Listado de tickets recientemente validados
7. **Modal de Detalle**: Información completa del ticket escaneado
8. **Modal de Confirmación**: Confirmación de entrega de productos
9. **Modal de Error**: Información sobre tickets inválidos

### Flujo de Validación
1. El empleado de la farmacia escanea el código QR presentado por el cliente o ingresa el código manualmente
2. El sistema verifica la validez del ticket
3. Si el ticket es válido, se muestra el detalle con los productos y montos
4. El empleado confirma la entrega de los productos
5. El sistema actualiza el inventario y marca el ticket como utilizado
6. Se muestra una confirmación y se ofrece imprimir un comprobante

### Escenarios de Error
- **Ticket Ya Utilizado**: Se muestra un mensaje indicando que el ticket ya ha sido canjeado
- **Ticket Vencido**: Se indica que el ticket ha superado su fecha de validez
- **Ticket No Encontrado**: Se informa que el código ingresado no corresponde a ningún ticket válido

### Responsive
- En dispositivos móviles, el menú lateral se colapsará
- El área de escaneo se adaptará al tamaño de la pantalla
- Los modales ocuparán toda la pantalla en dispositivos pequeños
