# Wireframe: Gestión de Usuarios (Administración)

```
+----------------------------------------------------------------------+
|                                                                      |
| [LOGO] Panel de Administración                    [Mi Cuenta ▼]      |
|                                                   [Cerrar Sesión]     |
+----------------------------------------------------------------------+
|                                                                      |
| +-------------+  +--------------------------------------------------+ |
| | Dashboard   |  | Dashboard > Usuarios                             | |
| | Usuarios    |  +--------------------------------------------------+ |
| | Farmacias   |  |                                                  | |
| | Productos   |  | Gestión de Usuarios                              | |
| | Categorías  |  |                                                  | |
| | Reportes    |  | [+ Añadir Usuario]  [Exportar]                   | |
| | Moderación  |  |                                                  | |
| | Soporte     |  | Buscar: [                    ] [Buscar]          | |
| | Configuración|  |                                                  | |
| |             |  | Filtrar por:                                     | |
| |             |  | [Tipo ▼] [Estado ▼] [Fecha Registro ▼]           | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | | ID    | Nombre       | Tipo    | Estado  | Reg.| |
| |             |  | |-------|--------------|---------|---------|-----| |
| |             |  | | #1001 | Juan Pérez   | Cliente | Activo  | 01/03| |
| |             |  | | [Ver] [Editar] [Suspender]               |     | |
| |             |  | |-------|--------------|---------|---------|-----| |
| |             |  | | #1002 | Ana López    | Cliente | Activo  | 05/03| |
| |             |  | | [Ver] [Editar] [Suspender]               |     | |
| |             |  | |-------|--------------|---------|---------|-----| |
| |             |  | | #1003 | Cruz Verde   | Farmacia| Activo  | 10/01| |
| |             |  | | [Ver] [Editar] [Suspender]               |     | |
| |             |  | |-------|--------------|---------|---------|-----| |
| |             |  | | #1004 | Ahumada      | Farmacia| Activo  | 15/01| |
| |             |  | | [Ver] [Editar] [Suspender]               |     | |
| |             |  | |-------|--------------|---------|---------|-----| |
| |             |  | | #1005 | Carlos Ruiz  | Cliente | Suspendido|20/03| |
| |             |  | | [Ver] [Editar] [Activar]                 |     | |
| |             |  | |-------|--------------|---------|---------|-----| |
| |             |  | | #1006 | María G.     | Admin   | Activo  | 01/01| |
| |             |  | | [Ver] [Editar] [Suspender]               |     | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | Mostrando 1-6 de 1,245 usuarios                  | |
| |             |  | [< Anterior] [1] [2] [3] [4] [5] [Siguiente >]   | |
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
|                 MODAL: VER DETALLE DE USUARIO                        |
|                                                                      |
| +------------------------------------------------------------------+ |
| | Usuario #1001: Juan Pérez                         [X] Cerrar     | |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | Información General                                              | |
| | +--------------------------------------------------------------+ | |
| | | Nombre: Juan Pérez                                           | | |
| | | Email: juan.perez@ejemplo.com                                | | |
| | | Teléfono: +56 9 1234 5678                                    | | |
| | | Tipo: Cliente                                                | | |
| | | Estado: Activo                                               | | |
| | | Fecha de Registro: 01/03/2025                                | | |
| | | Última Actividad: 24/04/2025 - 13:45                         | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Actividad Reciente                                               | |
| | +--------------------------------------------------------------+ | |
| | | Fecha     | Hora  | Actividad                                | | |
| | |-----------|-------|----------------------------------------| | |
| | | 24/04/2025| 13:45 | Generó ticket #12345                     | | |
| | | 20/04/2025| 11:30 | Generó ticket #12344                     | | |
| | | 15/04/2025| 09:15 | Generó ticket #12343                     | | |
| | | 10/04/2025| 16:20 | Actualizó perfil                         | | |
| | | 05/04/2025| 14:10 | Inició sesión                            | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Tickets Generados                                                | |
| | +--------------------------------------------------------------+ | |
| | | Ticket   | Fecha     | Farmacia    | Estado    | Total      | | |
| | |----------|-----------|-------------|-----------|------------| | |
| | | #12345   | 24/04/2025| Cruz Verde  | Vigente   | $12.030    | | |
| | | #12344   | 20/04/2025| Ahumada     | Utilizado | $9.985     | | |
| | | #12343   | 15/04/2025| SalcoBrand  | Vencido   | $4.945     | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | [EDITAR]  [SUSPENDER CUENTA]  [EXPORTAR DATOS]                   | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+

+----------------------------------------------------------------------+
|                                                                      |
|                 MODAL: AÑADIR/EDITAR USUARIO                         |
|                                                                      |
| +------------------------------------------------------------------+ |
| | Editar Usuario #1001                               [X] Cerrar    | |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | Información Personal                                             | |
| | +--------------------------------------------------------------+ | |
| | | Nombre:                                                      | | |
| | | [Juan Pérez                                               ]  | | |
| | |                                                              | | |
| | | Email:                                                       | | |
| | | [juan.perez@ejemplo.com                                   ]  | | |
| | |                                                              | | |
| | | Teléfono:                                                    | | |
| | | [+56 9 1234 5678                                         ]   | | |
| | |                                                              | | |
| | | Tipo de Usuario:                                             | | |
| | | [Cliente ▼]                                                  | | |
| | |                                                              | | |
| | | Estado:                                                      | | |
| | | [Activo ▼]                                                   | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Permisos y Roles                                                 | |
| | +--------------------------------------------------------------+ | |
| | | Rol:                                                         | | |
| | | [Usuario Estándar ▼]                                         | | |
| | |                                                              | | |
| | | Permisos Adicionales:                                        | | |
| | | ☐ Acceso a API                                               | | |
| | | ☐ Notificaciones Push                                        | | |
| | | ☐ Acceso Beta a Nuevas Funciones                             | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Notas Administrativas                                            | |
| | +--------------------------------------------------------------+ | |
| | | [                                                          ]  | | |
| | | [                                                          ]  | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | [CANCELAR]                          [GUARDAR CAMBIOS]            | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
```

## Notas Adicionales

### Componentes Principales
1. **Barra Superior**: Logo, título del panel y opciones de cuenta
2. **Menú Lateral**: Navegación principal del panel de administración
3. **Breadcrumbs**: Navegación jerárquica para ubicar al usuario
4. **Barra de Acciones**: Botones para añadir usuario y exportar datos
5. **Buscador y Filtros**: Herramientas para encontrar usuarios específicos
6. **Tabla de Usuarios**: Listado de usuarios con opciones de gestión
7. **Paginación**: Navegación entre páginas de resultados
8. **Modal de Detalle**: Información completa de un usuario
9. **Modal de Edición**: Formulario para añadir o editar usuarios

### Tipos de Usuario
- **Cliente**: Usuarios finales que buscan y compran productos
- **Farmacia**: Cuentas asociadas a farmacias participantes
- **Admin**: Administradores de la plataforma con acceso completo

### Estados de Usuario
- **Activo**: Usuario con acceso normal a la plataforma
- **Suspendido**: Usuario temporalmente bloqueado
- **Pendiente**: Usuario en proceso de verificación
- **Inactivo**: Usuario que no ha iniciado sesión en un período prolongado

### Interacciones
- El botón "Añadir Usuario" abre el modal con el formulario vacío
- El botón "Ver" abre el modal con información detallada del usuario
- El botón "Editar" abre el modal con el formulario prellenado
- Los botones "Suspender" y "Activar" cambian el estado del usuario
- Los filtros permiten refinar la lista de usuarios mostrados
- La paginación permite navegar entre diferentes páginas de resultados

### Responsive
- En dispositivos móviles, el menú lateral se colapsará
- La tabla se ajustará para mostrar menos columnas o permitir scroll horizontal
- Los modales ocuparán toda la pantalla en dispositivos pequeños
