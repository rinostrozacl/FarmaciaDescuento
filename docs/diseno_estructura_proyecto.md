# Diseño y Estructura del Proyecto FarmaciaDescuento

## Visión General

FarmaciaDescuento es una plataforma que conecta a farmacias con clientes interesados en adquirir productos con descuento, principalmente aquellos próximos a vencer. Este sistema busca beneficiar a ambas partes: los clientes obtienen medicamentos a precios reducidos y las farmacias disminuyen sus pérdidas por vencimiento de productos.

## Estructura de Carpetas

- **/docs**: Documentación del proyecto
  - **/requerimientos**: Especificaciones y requisitos del sistema
  - **/modelo_de_negocio**: Documentación del modelo de negocio
  - **/modulos**: Documentación detallada de cada módulo
  - **/implementacion**: Documentación técnica y de arquitectura
  - **/recursos_ia**: Recursos relacionados con IA para el proyecto

- **/app-web**: Aplicación web del sistema
  - **/src**: Código fuente de la aplicación web
    - **/components**: Componentes reutilizables
    - **/pages**: Páginas de la aplicación
    - **/services**: Servicios de conexión con Firebase
    - **/utils**: Utilidades y helpers

- **/app-movil**: Aplicación móvil desarrollada con Flutter
  - **/src**: Código fuente de la aplicación móvil
    - **/screens**: Pantallas de la aplicación
    - **/widgets**: Widgets reutilizables
    - **/models**: Modelos de datos
    - **/services**: Servicios de conexión con Firebase
    - **/utils**: Utilidades y helpers

- **/demo**: Prototipo y maquetas de la interfaz de usuario
  - Archivos HTML, CSS y JavaScript que muestran el diseño de la interfaz

- **/.ia**: Carpeta para seguimiento de conversaciones y contexto de IA (ignorada por git)

## Stack Tecnológico

### Frontend Web
- **Nuxt 3**: Framework basado en Vue 3 para desarrollo de aplicaciones web
- **Vue 3**: Biblioteca JavaScript para construir interfaces de usuario con Composition API
- **Tailwind CSS**: Framework CSS para diseño responsivo y personalizable
- **Pinia**: Biblioteca de gestión de estado para Vue 3

### Frontend Móvil
- **Flutter**: Framework para desarrollo de aplicaciones móviles multiplataforma

### Backend
- **Firebase**: Plataforma de desarrollo de aplicaciones
  - **Firestore**: Base de datos NoSQL en tiempo real
  - **Firebase Authentication**: Sistema de autenticación
  - **Firebase Storage**: Almacenamiento de archivos
  - **Firebase Functions**: Funciones serverless para lógica de negocio
  - **Firebase Hosting**: Alojamiento de aplicaciones web
  - **Dataconnect**: Servicio para conexión de datos

### Infraestructura
- **Google Cloud Platform (GCP)**: Infraestructura cloud para el despliegue de servicios

## Estado Actual del Proyecto

El proyecto se encuentra en fase de planificación y diseño:

1. La documentación está bien estructurada y detallada
2. Existe un prototipo/maqueta en la carpeta demo
3. Se han creado las carpetas para las aplicaciones web y móvil con su estructura básica
4. Se ha definido la arquitectura técnica basada en Firebase y GCP

## Próximos Pasos

1. Implementación de la aplicación web con Nuxt.js y Firebase
2. Implementación de la aplicación móvil con Flutter y Firebase
3. Configuración de la infraestructura en GCP
4. Desarrollo de los módulos principales del sistema
