# Requerimientos por Rol de Usuario

Este documento detalla los requerimientos específicos para cada tipo de usuario en la plataforma FarmaciaDescuento.

## 1. Administradores de Plataforma

Los administradores de plataforma son los encargados de gestionar todo el sistema a nivel global.

### Requerimientos Funcionales

#### 1.1 Gestión de Farmacias
- **RF-AP-01**: Aprobar o rechazar solicitudes de registro de nuevas farmacias
- **RF-AP-02**: Visualizar y editar información de todas las farmacias registradas
- **RF-AP-03**: Suspender temporalmente o dar de baja farmacias que incumplan las normas
- **RF-AP-04**: Verificar documentación legal de farmacias (permisos sanitarios, licencias)

#### 1.2 Gestión de Usuarios
- **RF-AP-05**: Crear, modificar y eliminar cuentas de administradores de plataforma
- **RF-AP-06**: Gestionar roles y permisos de todos los usuarios
- **RF-AP-07**: Suspender o bloquear cuentas de usuarios por comportamiento inadecuado
- **RF-AP-08**: Acceder a estadísticas de uso y comportamiento de usuarios

#### 1.3 Moderación de Contenido
- **RF-AP-09**: Revisar y aprobar/rechazar productos publicados que requieran verificación
- **RF-AP-10**: Gestionar reportes de productos o farmacias inapropiados
- **RF-AP-11**: Establecer y actualizar políticas de contenido permitido

#### 1.4 Configuración del Sistema
- **RF-AP-12**: Configurar parámetros globales del sistema (comisiones, límites, etc.)
- **RF-AP-13**: Gestionar categorías de productos y taxonomías
- **RF-AP-14**: Configurar promociones y campañas a nivel de plataforma
- **RF-AP-15**: Administrar parámetros del sistema de tickets de descuento
- **RF-AP-31**: Crear y gestionar criterios flexibles de categorización de productos (por uso, por compuesto genérico, etc.)
- **RF-AP-32**: Configurar la visualización de categorías en la interfaz de usuario

#### 1.5 Analítica y Reportes
- **RF-AP-16**: Acceder a dashboards con métricas clave de negocio
- **RF-AP-17**: Generar reportes personalizados de ventas, usuarios y farmacias
- **RF-AP-18**: Analizar tendencias de mercado y comportamiento de usuarios
- **RF-AP-19**: Exportar datos para análisis externos

#### 1.6 Soporte y Comunicación
- **RF-AP-20**: Gestionar tickets de soporte de farmacias y usuarios
- **RF-AP-21**: Enviar comunicaciones masivas a usuarios o farmacias
- **RF-AP-22**: Configurar mensajes automáticos y notificaciones del sistema

#### 1.7 Gestión de Tickets y Facturación
- **RF-AP-23**: Revisar y verificar tickets procesados por las farmacias
- **RF-AP-24**: Generar informes de tickets convertidos en venta por farmacia
- **RF-AP-25**: Calcular comisiones a cobrar a las farmacias por tickets redimidos
- **RF-AP-26**: Generar facturas para las farmacias basadas en tickets procesados
- **RF-AP-27**: Monitorear y resolver disputas relacionadas con tickets
- **RF-AP-28**: Establecer y ajustar tarifas de comisión por tipo de producto o farmacia
- **RF-AP-29**: Configurar parámetros del sistema de reserva temporal de stock (duración de validez de tickets)
- **RF-AP-30**: Monitorear y analizar estadísticas de conversión de tickets a ventas

## 2. Administradores de Farmacia

Los administradores de farmacia gestionan su propia farmacia dentro de la plataforma.

### Requerimientos Funcionales

#### 2.1 Gestión de Perfil de Farmacia
- **RF-AF-01**: Registrar y configurar el perfil de la farmacia
- **RF-AF-02**: Actualizar información de contacto, horarios y ubicación
- **RF-AF-03**: Gestionar sucursales y puntos de venta
- **RF-AF-04**: Cargar y actualizar documentación legal requerida

#### 2.2 Gestión de Productos
- **RF-AF-05**: Cargar nuevos productos próximos a vencer
- **RF-AF-06**: Establecer precios originales y porcentajes de descuento
- **RF-AF-07**: Gestionar inventario de productos disponibles
- **RF-AF-08**: Categorizar productos según tipo, uso, restricciones, etc.
- **RF-AF-09**: Establecer condiciones especiales (requiere receta, contraindicaciones)
- **RF-AF-29**: Definir y actualizar el stock disponible para cada producto publicado
- **RF-AF-32**: Asignar productos a múltiples categorías flexibles (por uso terapéutico, por compuesto genérico, etc.)
- **RF-AF-33**: Sugerir nuevas categorías basadas en los productos publicados

#### 2.3 Gestión de Tickets y Descuentos
- **RF-AF-10**: Visualizar tickets de descuento generados para su farmacia
- **RF-AF-11**: Validar tickets de descuento presentados por clientes
- **RF-AF-12**: Confirmar disponibilidad de productos con descuento
- **RF-AF-13**: Registrar uso de tickets de descuento
- **RF-AF-14**: Generar reportes de descuentos aplicados
- **RF-AF-30**: Visualizar stock reservado temporalmente por tickets activos
- **RF-AF-31**: Recibir notificaciones de tickets próximos a vencer

#### 2.4 Reportes y Estadísticas
- **RF-AF-15**: Acceder a estadísticas de ventas y productos más vendidos
- **RF-AF-16**: Visualizar métricas de reducción de mermas
- **RF-AF-17**: Analizar comportamiento de clientes y preferencias
- **RF-AF-18**: Generar reportes financieros y de inventario

#### 2.5 Comunicación con Clientes
- **RF-AF-19**: Responder consultas de clientes sobre productos
- **RF-AF-20**: Enviar notificaciones sobre nuevos productos o promociones
- **RF-AF-21**: Gestionar valoraciones y comentarios de clientes

#### 2.6 Configuración de Farmacia
- **RF-AF-22**: Configurar métodos de entrega disponibles
- **RF-AF-23**: Establecer zonas de cobertura para entregas a domicilio
- **RF-AF-24**: Definir políticas propias de devolución y garantías
- **RF-AF-25**: Gestionar usuarios y permisos dentro de la farmacia

## 3. Usuarios Compradores

Los usuarios compradores son los clientes finales que buscan y adquieren productos con descuento.

### Requerimientos Funcionales

#### 3.1 Registro y Perfil
- **RF-UC-01**: Registrarse en la plataforma con datos básicos
- **RF-UC-02**: Gestionar perfil personal y preferencias
- **RF-UC-03**: Administrar direcciones de entrega
- **RF-UC-04**: Configurar métodos de pago
- **RF-UC-05**: Gestionar configuración de privacidad y notificaciones

#### 3.2 Búsqueda y Exploración
- **RF-UC-06**: Buscar productos por nombre, categoría o farmacia
- **RF-UC-07**: Filtrar resultados por ubicación, descuento, fecha de vencimiento
- **RF-UC-08**: Explorar categorías de productos organizadas de forma flexible (por uso, por compuesto genérico, etc.)
- **RF-UC-09**: Ver farmacias cercanas con productos en oferta
- **RF-UC-10**: Guardar búsquedas frecuentes y favoritos
- **RF-UC-33**: Navegar por productos utilizando múltiples sistemas de categorización
- **RF-UC-34**: Recibir recomendaciones basadas en las categorías de interés

#### 3.3 Gestión de Productos
- **RF-UC-11**: Ver detalles completos de productos (incluyendo fecha de vencimiento)
- **RF-UC-12**: Añadir productos al carrito de compras
- **RF-UC-13**: Guardar productos en lista de deseos
- **RF-UC-14**: Comparar precios y descuentos entre farmacias
- **RF-UC-15**: Recibir recomendaciones personalizadas

#### 3.4 Generación de Tickets de Descuento
- **RF-UC-16**: Gestionar carrito de productos con descuento
- **RF-UC-17**: Generar ticket de descuento para los productos seleccionados
- **RF-UC-18**: Recibir ticket de descuento por correo electrónico
- **RF-UC-19**: Visualizar historial de tickets generados
- **RF-UC-20**: Acceder a tickets activos (no utilizados/no vencidos)
- **RF-UC-31**: Ver tiempo restante de validez de los tickets (24 horas)
- **RF-UC-32**: Recibir notificaciones sobre tickets próximos a vencer

#### 3.5 Seguimiento y Uso de Tickets
- **RF-UC-21**: Verificar el estado de los tickets generados (activo, usado, vencido)
- **RF-UC-22**: Ver historial de tickets utilizados
- **RF-UC-23**: Cancelar tickets no utilizados
- **RF-UC-24**: Calificar y comentar sobre la experiencia en la farmacia
- **RF-UC-25**: Contactar con soporte en caso de problemas con los tickets

#### 3.6 Notificaciones y Alertas
- **RF-UC-26**: Configurar alertas para productos específicos
- **RF-UC-27**: Recibir notificaciones sobre nuevos productos con descuento
- **RF-UC-28**: Obtener alertas sobre productos próximos a vencer en farmacias cercanas
- **RF-UC-29**: Recibir recordatorios sobre productos guardados
- **RF-UC-30**: Obtener notificaciones sobre el estado de pedidos

## Requerimientos No Funcionales

### Seguridad
- **RNF-01**: Implementar autenticación segura para todos los tipos de usuarios
- **RNF-02**: Cifrar datos sensibles de usuarios y transacciones
- **RNF-03**: Cumplir con regulaciones de protección de datos (GDPR, LGPD, etc.)
- **RNF-04**: Implementar protección contra ataques comunes (XSS, CSRF, inyección SQL)
- **RNF-05**: Realizar auditorías de seguridad periódicas

### Rendimiento
- **RNF-06**: Garantizar tiempos de respuesta menores a 2 segundos para operaciones comunes
- **RNF-07**: Soportar al menos 1000 usuarios concurrentes sin degradación
- **RNF-08**: Optimizar carga de imágenes y recursos para conexiones lentas
- **RNF-09**: Implementar caché para mejorar tiempos de respuesta
- **RNF-10**: Garantizar escalabilidad horizontal para crecimiento futuro

### Usabilidad
- **RNF-11**: Diseñar interfaces intuitivas y fáciles de usar
- **RNF-12**: Implementar diseño responsivo para todos los dispositivos
- **RNF-13**: Garantizar accesibilidad según estándares WCAG 2.1
- **RNF-14**: Proporcionar retroalimentación clara sobre acciones del usuario
- **RNF-15**: Minimizar pasos necesarios para completar tareas comunes

### Disponibilidad
- **RNF-16**: Garantizar disponibilidad del sistema 24/7 con 99.9% de uptime
- **RNF-17**: Implementar sistemas de respaldo y recuperación ante fallos
- **RNF-18**: Realizar mantenimientos programados en horarios de baja actividad
- **RNF-19**: Implementar monitoreo continuo del sistema
- **RNF-20**: Establecer plan de continuidad de negocio

### Compatibilidad
- **RNF-21**: Garantizar compatibilidad con navegadores modernos (Chrome, Firefox, Safari, Edge)
- **RNF-22**: Asegurar funcionamiento en iOS 13+ y Android 8+
- **RNF-23**: Optimizar para diferentes tamaños de pantalla y resoluciones
- **RNF-24**: Garantizar funcionamiento correcto con diferentes velocidades de conexión
