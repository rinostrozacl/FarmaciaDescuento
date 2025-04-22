# Casos de Uso - FarmaciaDescuento

## Actores Principales
- **Cliente**: Usuario final que busca productos con descuento
- **Farmacia**: Establecimiento que ofrece productos próximos a vencer con descuento
- **Administrador**: Personal que gestiona la plataforma

## Casos de Uso para Clientes

### CU-C01: Registro de Cliente
**Actor Principal**: Cliente
**Descripción**: El cliente se registra en la plataforma proporcionando información básica.
**Flujo Principal**:
1. El cliente accede a la opción de registro
2. Ingresa datos personales (nombre, correo, teléfono)
3. Crea una contraseña
4. Acepta términos y condiciones
5. Verifica su cuenta mediante correo electrónico
6. El sistema confirma el registro exitoso

### CU-C02: Búsqueda de Productos con Descuento
**Actor Principal**: Cliente
**Descripción**: El cliente busca productos disponibles con descuento.
**Flujo Principal**:
1. El cliente inicia sesión en la plataforma
2. Accede a la sección de búsqueda
3. Filtra por categoría, ubicación o porcentaje de descuento
4. El sistema muestra los resultados que coinciden con los criterios
5. El cliente puede ordenar los resultados por precio, descuento o fecha de vencimiento

### CU-C03: Compra de Producto
**Actor Principal**: Cliente
**Descripción**: El cliente adquiere un producto con descuento.
**Flujo Principal**:
1. El cliente selecciona un producto de su interés
2. Revisa detalles (precio original, descuento, fecha de vencimiento)
3. Agrega el producto al carrito
4. Procede al pago
5. Selecciona método de entrega (retiro en farmacia o envío)
6. Realiza el pago
7. Recibe confirmación de compra

### CU-C04: Configuración de Alertas
**Actor Principal**: Cliente
**Descripción**: El cliente configura alertas para recibir notificaciones sobre productos de su interés.
**Flujo Principal**:
1. El cliente accede a su perfil
2. Selecciona "Configurar Alertas"
3. Define categorías de productos de interés
4. Establece rango de descuento mínimo
5. Define ubicación preferida
6. Guarda configuración
7. Comienza a recibir notificaciones según sus preferencias

## Casos de Uso para Farmacias

### CU-F01: Registro de Farmacia
**Actor Principal**: Farmacia
**Descripción**: La farmacia se registra en la plataforma.
**Flujo Principal**:
1. El representante de la farmacia accede a la opción de registro para farmacias
2. Ingresa datos del establecimiento (nombre, dirección, RUT)
3. Proporciona información de contacto
4. Carga documentos de verificación (permisos sanitarios)
5. Crea credenciales de acceso
6. El sistema envía la solicitud para verificación
7. El administrador verifica y aprueba el registro
8. La farmacia recibe confirmación de aprobación

### CU-F02: Publicación de Productos con Descuento
**Actor Principal**: Farmacia
**Descripción**: La farmacia publica productos próximos a vencer con descuento.
**Flujo Principal**:
1. La farmacia inicia sesión en la plataforma
2. Accede a "Publicar Producto"
3. Ingresa detalles del producto (nombre, descripción, categoría)
4. Especifica fecha de vencimiento
5. Establece precio original y porcentaje de descuento
6. Indica cantidad disponible
7. Carga imágenes del producto
8. Confirma la publicación
9. El sistema verifica y publica el producto

### CU-F03: Gestión de Inventario
**Actor Principal**: Farmacia
**Descripción**: La farmacia gestiona su inventario de productos con descuento.
**Flujo Principal**:
1. La farmacia accede a su panel de control
2. Selecciona "Gestionar Inventario"
3. Visualiza todos los productos publicados
4. Puede actualizar cantidades disponibles
5. Puede modificar descuentos
6. Puede retirar productos ya vendidos
7. El sistema actualiza la información en tiempo real

### CU-F04: Visualización de Estadísticas
**Actor Principal**: Farmacia
**Descripción**: La farmacia visualiza estadísticas de ventas y reducción de mermas.
**Flujo Principal**:
1. La farmacia accede a su panel de control
2. Selecciona "Estadísticas"
3. Visualiza gráficos de ventas por periodo
4. Accede a datos de reducción de mermas
5. Consulta productos más vendidos
6. Analiza comportamiento de clientes
7. Puede exportar reportes en diferentes formatos

## Casos de Uso para Administradores

### CU-A01: Verificación de Farmacias
**Actor Principal**: Administrador
**Descripción**: El administrador verifica y aprueba el registro de farmacias.
**Flujo Principal**:
1. El administrador accede al panel de administración
2. Revisa solicitudes pendientes de farmacias
3. Verifica documentación proporcionada
4. Valida permisos sanitarios
5. Aprueba o rechaza la solicitud
6. El sistema notifica a la farmacia sobre la decisión

### CU-A02: Moderación de Productos
**Actor Principal**: Administrador
**Descripción**: El administrador modera los productos publicados para asegurar cumplimiento.
**Flujo Principal**:
1. El administrador accede al panel de moderación
2. Revisa productos recientemente publicados
3. Verifica que cumplan con las políticas de la plataforma
4. Aprueba productos que cumplen los requisitos
5. Rechaza o solicita modificaciones para productos que no cumplen
6. El sistema notifica a las farmacias sobre las decisiones

### CU-A03: Gestión de Reportes y Quejas
**Actor Principal**: Administrador
**Descripción**: El administrador gestiona reportes y quejas de usuarios.
**Flujo Principal**:
1. El administrador accede a la sección de reportes
2. Revisa quejas recibidas de clientes o farmacias
3. Investiga cada caso
4. Se comunica con las partes involucradas
5. Toma decisiones para resolver el problema
6. Implementa medidas correctivas
7. Cierra el caso y notifica a los involucrados

### CU-A04: Análisis de Métricas de la Plataforma
**Actor Principal**: Administrador
**Descripción**: El administrador analiza métricas generales de la plataforma.
**Flujo Principal**:
1. El administrador accede al dashboard de análisis
2. Visualiza métricas clave (usuarios activos, transacciones, volumen de ventas)
3. Analiza tendencias y patrones
4. Identifica áreas de mejora
5. Genera reportes para la toma de decisiones
6. Implementa ajustes en la plataforma según los hallazgos
