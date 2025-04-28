# Wireframe: Mis Tickets (Cliente)

```
+----------------------------------------------------------------------+
|                                                                      |
| [LOGO] [Barra de búsqueda             ] [Mi Cuenta ▼] [Cerrar Sesión]|
|        [Inicio] [Categorías] [Farmacias] [Mis Tickets]  [🛒 0]       |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
| +------------------------------------------------------------------+ |
| | [Inicio] > Mis Tickets                                           | |
| +------------------------------------------------------------------+ |
|                                                                      |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | Mis Tickets de Descuento                                         | |
| |                                                                  | |
| | [Todos] [Vigentes] [Utilizados] [Vencidos]                       | |
| |                                                                  | |
| | +--------------------------------------------------------------+ | |
| | |                                                              | | |
| | | Ticket #12345                                     [VIGENTE]  | | |
| | |                                                              | | |
| | | Fecha de generación: 23/04/2025                              | | |
| | | Válido hasta: 25/04/2025                                     | | |
| | |                                                              | | |
| | | Farmacia: Cruz Verde - Av. Principal 123                     | | |
| | |                                                              | | |
| | | Productos:                                                   | | |
| | | - Paracetamol 500mg (1) - $3.590                            | | |
| | | - Ibuprofeno 400mg (2) - $8.440                             | | |
| | |                                                              | | |
| | | Total: $12.030                                               | | |
| | |                                                              | | |
| | | [VER DETALLE]                                                | | |
| | |                                                              | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | +--------------------------------------------------------------+ | |
| | |                                                              | | |
| | | Ticket #12344                                   [UTILIZADO]  | | |
| | |                                                              | | |
| | | Fecha de generación: 20/04/2025                              | | |
| | | Fecha de uso: 21/04/2025                                     | | |
| | |                                                              | | |
| | | Farmacia: Ahumada - Calle Comercio 456                       | | |
| | |                                                              | | |
| | | Productos:                                                   | | |
| | | - Loratadina 10mg (1) - $3.995                              | | |
| | | - Vitamina C 1000mg (2) - $5.990                            | | |
| | |                                                              | | |
| | | Total: $9.985                                                | | |
| | |                                                              | | |
| | | [VER DETALLE]                                                | | |
| | |                                                              | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | +--------------------------------------------------------------+ | |
| | |                                                              | | |
| | | Ticket #12343                                    [VENCIDO]   | | |
| | |                                                              | | |
| | | Fecha de generación: 15/04/2025                              | | |
| | | Válido hasta: 17/04/2025                                     | | |
| | |                                                              | | |
| | | Farmacia: SalcoBrand - Plaza Central 789                     | | |
| | |                                                              | | |
| | | Productos:                                                   | | |
| | | - Omeprazol 20mg (1) - $4.945                               | | |
| | |                                                              | | |
| | | Total: $4.945                                                | | |
| | |                                                              | | |
| | | [VER DETALLE]                                                | | |
| | |                                                              | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | [Cargar Más Tickets]                                             | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
| [FOOTER]                                                             |
| [Logo] [Enlaces] [Contacto] [Redes Sociales] [Términos] [Privacidad] |
|                                                                      |
+----------------------------------------------------------------------+

+----------------------------------------------------------------------+
|                                                                      |
|                       MODAL DETALLE DE TICKET                        |
|                                                                      |
| +------------------------------------------------------------------+ |
| | Detalle del Ticket #12345                             [X] Cerrar | |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | Estado: VIGENTE                                                  | |
| | Fecha de generación: 23/04/2025 - 15:30                          | |
| | Válido hasta: 25/04/2025 - 23:59                                 | |
| |                                                                  | |
| | Farmacia: Cruz Verde                                             | |
| | Dirección: Av. Principal 123, Puerto Montt                       | |
| | Teléfono: (65) 2123456                                           | |
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
| | +--------------------------------------------------------------+ | |
| | |                                                              | | |
| | |                      [CÓDIGO QR]                             | | |
| | |                                                              | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Instrucciones:                                                   | |
| | 1. Presenta este código QR en la farmacia seleccionada           | |
| | 2. El personal de la farmacia escaneará el código                | |
| | 3. Realiza el pago del monto indicado                            | |
| | 4. Recibe tus productos con descuento                            | |
| |                                                                  | |
| | [DESCARGAR PDF]                                                  | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
```

## Notas Adicionales

### Componentes Principales
1. **Breadcrumbs**: Navegación jerárquica para ubicar al usuario
2. **Filtros de Tickets**: Tabs para filtrar por estado (Todos, Vigentes, Utilizados, Vencidos)
3. **Lista de Tickets**: Tarjetas con información resumida de cada ticket
4. **Modal de Detalle**: Ventana emergente con información completa del ticket
5. **Código QR**: Código para presentar en la farmacia
6. **Botón de Descarga**: Opción para descargar el ticket en PDF

### Estados de Tickets
- **Vigente**: Ticket generado y disponible para usar
- **Utilizado**: Ticket que ya ha sido canjeado en la farmacia
- **Vencido**: Ticket que ha superado su fecha de validez

### Interacciones
- Los tabs permiten filtrar los tickets por su estado
- El botón "Ver Detalle" abre un modal con información completa
- El botón "Cargar Más Tickets" permite ver tickets anteriores
- El código QR puede ser escaneado por el personal de la farmacia
- El botón "Descargar PDF" permite guardar el ticket para uso offline

### Responsive
- En móvil, las tarjetas de tickets se mostrarán en columna ocupando el ancho completo
- El modal de detalle ocupará toda la pantalla en dispositivos móviles
- Los filtros se ajustarán para ser accesibles en pantallas pequeñas
