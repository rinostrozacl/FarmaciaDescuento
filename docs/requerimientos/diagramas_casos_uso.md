# Diagramas de Casos de Uso - FarmaciaDescuento

Este documento contiene los diagramas de casos de uso para el sistema FarmaciaDescuento, representando las principales interacciones entre los usuarios y el sistema.

## Diagrama General de Actores

```mermaid
graph TD
    A[Sistema FarmaciaDescuento] --- B[Administrador de Plataforma]
    A --- C[Administrador de Farmacia]
    A --- D[Usuario Comprador]
```

## Casos de Uso para Administrador de Plataforma

```mermaid
flowchart TD
    Admin[Administrador de Plataforma]
    
    CU1[Gestionar Farmacias]
    CU2[Gestionar Usuarios]
    CU3[Moderar Contenido]
    CU4[Configurar Sistema]
    CU5[Generar Reportes]
    CU6[Gestionar Tickets y Facturación]
    CU7[Gestionar Categorías]
    
    Admin --> CU1
    Admin --> CU2
    Admin --> CU3
    Admin --> CU4
    Admin --> CU5
    Admin --> CU6
    Admin --> CU7
    
    CU1 --> CU1_1[Aprobar Farmacias]
    CU1 --> CU1_2[Suspender Farmacias]
    CU1 --> CU1_3[Verificar Documentación]
    
    CU4 --> CU4_1[Configurar Parámetros]
    CU4 --> CU4_2[Gestionar Taxonomías]
    
    CU6 --> CU6_1[Revisar Tickets Procesados]
    CU6 --> CU6_2[Calcular Comisiones]
    CU6 --> CU6_3[Generar Facturas]
    
    CU7 --> CU7_1[Crear Categorías Flexibles]
    CU7 --> CU7_2[Configurar Visualización]
    CU7 --> CU7_3[Analizar Efectividad]
```

## Casos de Uso para Administrador de Farmacia

```mermaid
flowchart TD
    Farmacia[Administrador de Farmacia]
    
    CU1[Gestionar Perfil]
    CU2[Gestionar Productos]
    CU3[Gestionar Tickets]
    CU4[Ver Reportes]
    CU5[Comunicación con Clientes]
    
    Farmacia --> CU1
    Farmacia --> CU2
    Farmacia --> CU3
    Farmacia --> CU4
    Farmacia --> CU5
    
    CU2 --> CU2_1[Cargar Productos]
    CU2 --> CU2_2[Establecer Descuentos]
    CU2 --> CU2_3[Gestionar Stock]
    CU2 --> CU2_4[Asignar Categorías]
    
    CU3 --> CU3_1[Validar Tickets]
    CU3 --> CU3_2[Registrar Uso]
    CU3 --> CU3_3[Ver Tickets Pendientes]
    
    CU4 --> CU4_1[Ver Estadísticas]
    CU4 --> CU4_2[Analizar Conversión]
```

## Casos de Uso para Usuario Comprador

```mermaid
flowchart TD
    Usuario[Usuario Comprador]
    
    CU1[Gestionar Perfil]
    CU2[Buscar Productos]
    CU3[Gestionar Carrito]
    CU4[Generar Tickets]
    CU5[Seguimiento de Tickets]
    CU6[Recibir Notificaciones]
    
    Usuario --> CU1
    Usuario --> CU2
    Usuario --> CU3
    Usuario --> CU4
    Usuario --> CU5
    Usuario --> CU6
    
    CU2 --> CU2_1[Buscar por Nombre]
    CU2 --> CU2_2[Filtrar por Ubicación]
    CU2 --> CU2_3[Explorar Categorías]
    CU2 --> CU2_4[Cambiar Vista de Categorización]
    
    CU4 --> CU4_1[Generar Ticket]
    CU4 --> CU4_2[Recibir por Email]
    
    CU5 --> CU5_1[Ver Estado]
    CU5 --> CU5_2[Ver Tiempo Restante]
    CU5 --> CU5_3[Cancelar Ticket]
```

## Diagrama de Caso de Uso: Proceso de Ticket

```mermaid
sequenceDiagram
    actor Cliente
    actor Farmacia
    participant Sistema
    
    Cliente->>Sistema: Selecciona productos
    Sistema->>Sistema: Reserva stock temporalmente
    Sistema->>Cliente: Genera ticket de descuento
    Sistema->>Cliente: Envía ticket por email
    
    Note over Cliente,Sistema: Ticket válido por 24 horas
    
    alt Ticket utilizado
        Cliente->>Farmacia: Presenta ticket
        Farmacia->>Sistema: Valida ticket
        Sistema->>Farmacia: Confirma validez
        Farmacia->>Cliente: Aplica descuento
        Sistema->>Sistema: Marca ticket como usado
        Sistema->>Sistema: Descuenta stock permanentemente
    else Ticket no utilizado
        Sistema->>Sistema: Monitorea tiempo de validez
        Sistema->>Cliente: Notifica próximo vencimiento
        Sistema->>Sistema: Marca ticket como vencido
        Sistema->>Sistema: Libera stock reservado
    end
```

## Diagrama de Caso de Uso: Categorización de Productos

```mermaid
flowchart TD
    Admin[Administrador]
    Farmacia[Farmacia]
    Usuario[Usuario]
    
    Admin --> CU1[Crear Categorías Flexibles]
    Admin --> CU2[Configurar Visualización]
    
    Farmacia --> CU3[Publicar Producto]
    CU3 --> CU4[Asignar a Múltiples Categorías]
    
    Usuario --> CU5[Navegar por Categorías]
    CU5 --> CU6[Cambiar Sistema de Categorización]
    CU5 --> CU7[Filtrar Productos]
    
    CU1 --> Cat1[Categorías por Uso]
    CU1 --> Cat2[Categorías por Compuesto]
    CU1 --> Cat3[Otras Categorías]
    
    CU4 --> Cat1
    CU4 --> Cat2
    CU4 --> Cat3
    
    CU6 --> Cat1
    CU6 --> Cat2
    CU6 --> Cat3
```

## Diagrama de Caso de Uso: Facturación a Farmacias

```mermaid
sequenceDiagram
    actor Farmacia
    actor Admin
    participant Sistema
    
    Farmacia->>Sistema: Valida ticket de cliente
    Sistema->>Sistema: Registra ticket como usado
    
    Note over Sistema,Admin: Proceso mensual de facturación
    
    Sistema->>Sistema: Genera informe de tickets usados
    Sistema->>Admin: Presenta informe para revisión
    Admin->>Sistema: Verifica y aprueba
    Sistema->>Sistema: Calcula comisiones
    Sistema->>Farmacia: Genera factura
    Farmacia->>Sistema: Realiza pago
    Sistema->>Admin: Confirma pago recibido
    
    alt Disputa
        Farmacia->>Sistema: Reporta discrepancia
        Sistema->>Admin: Notifica disputa
        Admin->>Sistema: Resuelve disputa
        Sistema->>Farmacia: Notifica resolución
    end
```
