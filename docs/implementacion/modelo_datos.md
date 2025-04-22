# Modelo de Datos - FarmaciaDescuento

Este documento describe el modelo de datos para el sistema FarmaciaDescuento, diseñado para PostgreSQL y gestionado a través de Hasura GraphQL Engine.

## Diagrama Entidad-Relación

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    USERS ||--o{ TICKETS : generates
    USERS ||--o{ PHARMACIES : manages
    USER_ROLES ||--o{ ROLE_PERMISSIONS : contains
    
    PHARMACIES ||--o{ PHARMACY_BRANCHES : has
    PHARMACIES ||--o{ PRODUCTS : offers
    PHARMACY_BRANCHES ||--o{ PRODUCTS : stocks
    
    PRODUCTS ||--o{ PRODUCT_CATEGORIES : belongs_to
    PRODUCTS ||--o{ TICKET_ITEMS : included_in
    CATEGORIES ||--o{ PRODUCT_CATEGORIES : contains
    CATEGORY_TYPES ||--o{ CATEGORIES : groups
    
    TICKETS ||--o{ TICKET_ITEMS : contains
    TICKETS ||--o{ TICKET_STATUS_HISTORY : tracks
    TICKET_STATUS ||--o{ TICKET_STATUS_HISTORY : defines
    
    PHARMACIES ||--o{ INVOICES : billed_to
    TICKETS ||--o{ INVOICES : included_in
    
    USERS {
        uuid id PK
        string email
        string password_hash
        string first_name
        string last_name
        string phone
        jsonb profile_data
        timestamp created_at
        timestamp updated_at
        boolean is_active
        timestamp last_login
    }
    
    USER_ROLES {
        uuid id PK
        uuid user_id FK
        string role_name
        timestamp created_at
        timestamp updated_at
    }
    
    ROLE_PERMISSIONS {
        uuid id PK
        string role_name
        string resource
        string action
        jsonb conditions
        timestamp created_at
        timestamp updated_at
    }
    
    PHARMACIES {
        uuid id PK
        string name
        string business_id
        string email
        string phone
        jsonb address
        string website
        uuid admin_user_id FK
        jsonb verification_data
        string verification_status
        timestamp created_at
        timestamp updated_at
        boolean is_active
    }
    
    PHARMACY_BRANCHES {
        uuid id PK
        uuid pharmacy_id FK
        string name
        string phone
        jsonb address
        point location
        jsonb operating_hours
        timestamp created_at
        timestamp updated_at
        boolean is_active
    }
    
    PRODUCTS {
        uuid id PK
        uuid pharmacy_id FK
        uuid branch_id FK
        string name
        text description
        string sku
        decimal original_price
        decimal discount_percentage
        date expiration_date
        int available_stock
        int reserved_stock
        string status
        jsonb additional_data
        timestamp created_at
        timestamp updated_at
    }
    
    CATEGORY_TYPES {
        uuid id PK
        string name
        string description
        int display_order
        timestamp created_at
        timestamp updated_at
    }
    
    CATEGORIES {
        uuid id PK
        uuid category_type_id FK
        uuid parent_category_id FK
        string name
        string description
        string icon
        string image_url
        int display_order
        timestamp created_at
        timestamp updated_at
    }
    
    PRODUCT_CATEGORIES {
        uuid id PK
        uuid product_id FK
        uuid category_id FK
        timestamp created_at
    }
    
    TICKETS {
        uuid id PK
        uuid user_id FK
        string ticket_code
        string qr_code_url
        timestamp expiration_time
        string current_status
        timestamp created_at
        timestamp updated_at
    }
    
    TICKET_ITEMS {
        uuid id PK
        uuid ticket_id FK
        uuid product_id FK
        int quantity
        decimal price_at_time
        decimal discount_at_time
        timestamp created_at
    }
    
    TICKET_STATUS {
        string status_code PK
        string name
        string description
        timestamp created_at
        timestamp updated_at
    }
    
    TICKET_STATUS_HISTORY {
        uuid id PK
        uuid ticket_id FK
        string status_code FK
        uuid changed_by_user_id FK
        text notes
        timestamp created_at
    }
    
    INVOICES {
        uuid id PK
        uuid pharmacy_id FK
        string invoice_number
        date invoice_date
        date due_date
        decimal total_amount
        string status
        jsonb payment_details
        timestamp created_at
        timestamp updated_at
    }
    
    INVOICE_ITEMS {
        uuid id PK
        uuid invoice_id FK
        uuid ticket_id FK
        decimal commission_amount
        decimal commission_rate
        timestamp created_at
    }
```

## Descripción de Tablas

### Usuarios y Autenticación

#### USERS
Almacena información de todos los usuarios del sistema.
- **id**: Identificador único del usuario
- **email**: Correo electrónico (único)
- **password_hash**: Hash de la contraseña
- **first_name, last_name**: Nombre y apellido
- **phone**: Número telefónico
- **profile_data**: Datos adicionales del perfil (JSON)
- **created_at, updated_at**: Fechas de creación y actualización
- **is_active**: Estado de la cuenta
- **last_login**: Último inicio de sesión

#### USER_ROLES
Define los roles asignados a cada usuario.
- **id**: Identificador único
- **user_id**: Referencia al usuario
- **role_name**: Nombre del rol (admin_platform, admin_pharmacy, customer)
- **created_at, updated_at**: Fechas de creación y actualización

#### ROLE_PERMISSIONS
Define los permisos asociados a cada rol.
- **id**: Identificador único
- **role_name**: Nombre del rol
- **resource**: Recurso al que aplica el permiso
- **action**: Acción permitida (create, read, update, delete)
- **conditions**: Condiciones específicas para el permiso (JSON)
- **created_at, updated_at**: Fechas de creación y actualización

### Farmacias

#### PHARMACIES
Almacena información de las farmacias registradas.
- **id**: Identificador único
- **name**: Nombre de la farmacia
- **business_id**: Identificación fiscal/comercial
- **email, phone**: Contacto
- **address**: Dirección (JSON)
- **website**: Sitio web
- **admin_user_id**: Usuario administrador principal
- **verification_data**: Datos de verificación (JSON)
- **verification_status**: Estado de verificación
- **created_at, updated_at**: Fechas de creación y actualización
- **is_active**: Estado de la farmacia

#### PHARMACY_BRANCHES
Sucursales de cada farmacia.
- **id**: Identificador único
- **pharmacy_id**: Referencia a la farmacia principal
- **name**: Nombre de la sucursal
- **phone**: Teléfono de contacto
- **address**: Dirección (JSON)
- **location**: Coordenadas geográficas
- **operating_hours**: Horarios de atención (JSON)
- **created_at, updated_at**: Fechas de creación y actualización
- **is_active**: Estado de la sucursal

### Productos y Categorías

#### PRODUCTS
Productos ofrecidos con descuento.
- **id**: Identificador único
- **pharmacy_id**: Farmacia que ofrece el producto
- **branch_id**: Sucursal específica (opcional)
- **name**: Nombre del producto
- **description**: Descripción detallada
- **sku**: Código de producto
- **original_price**: Precio original
- **discount_percentage**: Porcentaje de descuento
- **expiration_date**: Fecha de vencimiento
- **available_stock**: Stock disponible
- **reserved_stock**: Stock reservado por tickets activos
- **status**: Estado (active, inactive, sold_out)
- **additional_data**: Datos adicionales (JSON)
- **created_at, updated_at**: Fechas de creación y actualización

#### CATEGORY_TYPES
Tipos de categorización (por uso, por compuesto, etc.).
- **id**: Identificador único
- **name**: Nombre del tipo de categoría
- **description**: Descripción
- **display_order**: Orden de visualización
- **created_at, updated_at**: Fechas de creación y actualización

#### CATEGORIES
Categorías para agrupar productos.
- **id**: Identificador único
- **category_type_id**: Tipo de categoría
- **parent_category_id**: Categoría padre (para jerarquías)
- **name**: Nombre de la categoría
- **description**: Descripción
- **icon**: Ícono representativo
- **display_order**: Orden de visualización
- **created_at, updated_at**: Fechas de creación y actualización

#### PRODUCT_CATEGORIES
Relación muchos a muchos entre productos y categorías.
- **id**: Identificador único
- **product_id**: Referencia al producto
- **category_id**: Referencia a la categoría
- **created_at**: Fecha de creación

### Tickets y Estados

#### TICKETS
Tickets de descuento generados por usuarios.
- **id**: Identificador único
- **user_id**: Usuario que generó el ticket
- **ticket_code**: Código único del ticket
- **qr_code_url**: URL del código QR
- **expiration_time**: Tiempo de expiración
- **current_status**: Estado actual
- **created_at, updated_at**: Fechas de creación y actualización

#### TICKET_ITEMS
Productos incluidos en cada ticket.
- **id**: Identificador único
- **ticket_id**: Referencia al ticket
- **product_id**: Referencia al producto
- **quantity**: Cantidad
- **price_at_time**: Precio al momento de generar el ticket
- **discount_at_time**: Descuento al momento de generar el ticket
- **created_at**: Fecha de creación

#### TICKET_STATUS
Posibles estados de un ticket.
- **status_code**: Código de estado (created, active, validated, used, expired, cancelled, disputed, invalid)
- **name**: Nombre legible
- **description**: Descripción del estado
- **created_at, updated_at**: Fechas de creación y actualización

#### TICKET_STATUS_HISTORY
Historial de cambios de estado de tickets.
- **id**: Identificador único
- **ticket_id**: Referencia al ticket
- **status_code**: Estado asignado
- **changed_by_user_id**: Usuario que realizó el cambio
- **notes**: Notas adicionales
- **created_at**: Fecha del cambio

### Facturación

#### INVOICES
Facturas generadas para farmacias.
- **id**: Identificador único
- **pharmacy_id**: Farmacia facturada
- **invoice_number**: Número de factura
- **invoice_date**: Fecha de emisión
- **due_date**: Fecha de vencimiento
- **total_amount**: Monto total
- **status**: Estado de la factura
- **payment_details**: Detalles de pago (JSON)
- **created_at, updated_at**: Fechas de creación y actualización

#### INVOICE_ITEMS
Ítems incluidos en cada factura.
- **id**: Identificador único
- **invoice_id**: Referencia a la factura
- **ticket_id**: Ticket procesado
- **commission_amount**: Monto de comisión
- **commission_rate**: Tasa de comisión aplicada
- **created_at**: Fecha de creación

## Índices Recomendados

Para optimizar el rendimiento de consultas frecuentes, se recomiendan los siguientes índices:

1. **USERS**: email (único), last_login
2. **PHARMACIES**: admin_user_id, verification_status, is_active
3. **PRODUCTS**: pharmacy_id, expiration_date, status
4. **TICKETS**: user_id, ticket_code (único), expiration_time, current_status
5. **TICKET_ITEMS**: ticket_id, product_id
6. **PRODUCT_CATEGORIES**: product_id, category_id
7. **PHARMACY_BRANCHES**: pharmacy_id, location (índice espacial)

## Restricciones y Validaciones

### Nivel de Base de Datos
1. **Integridad referencial**: Todas las claves foráneas deben tener restricciones de integridad referencial.
2. **Unicidad**: Correos electrónicos de usuarios, códigos de tickets, etc.
3. **Valores no nulos**: Campos críticos como user_id, pharmacy_id, etc.
4. **Restricciones de rango**: Porcentajes de descuento entre 0-100, precios positivos, etc.

### Nivel de Hasura
1. **Políticas de permisos** basadas en roles para cada tabla
2. **Validaciones personalizadas** mediante acciones de Hasura
3. **Triggers** para actualizar automáticamente campos derivados

## Consideraciones de Escalabilidad

1. **Particionamiento**: Para tablas que crecerán significativamente (TICKETS, PRODUCTS)
2. **Archivado**: Estrategia para archivar tickets vencidos y productos antiguos
3. **Índices**: Revisión periódica del rendimiento de índices y consultas
4. **Caché**: Uso de Redis para cachear consultas frecuentes
