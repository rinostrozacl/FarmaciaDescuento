# Documento de Proyecto - Farmacia Descuento

## 1. Resumen Ejecutivo

Farmacia Descuento es una plataforma digital que implementa principios de economía circular en el sector farmacéutico, conectando farmacias con clientes finales para la comercialización de productos próximos a vencer a precios reducidos. El proyecto crea un ecosistema circular donde los productos farmacéuticos que normalmente serían descartados regresan al ciclo de consumo, generando valor para todos los participantes: reducción de mermas para las farmacias, acceso a medicamentos con descuento para los clientes, y disminución del impacto ambiental causado por residuos farmacéuticos. Esta iniciativa transforma un modelo lineal de compra-uso-descarte en un sistema circular que maximiza el valor de los productos hasta el final de su vida útil.

## 2. Problemática

### 2.1 Situación Actual

- Las farmacias operan en un modelo lineal donde los productos no vendidos antes de su vencimiento se desechan, generando pérdidas económicas y ambientales significativas
- Los clientes desconocen la disponibilidad de productos con descuento por proximidad a vencimiento, fragmentando el ciclo potencial de aprovechamiento
- No existe una plataforma que aplique principios de economía circular al conectar la oferta y demanda de estos productos, rompiendo la cadena de valor
- Las farmacias carecen de herramientas digitales para implementar modelos circulares en la gestión de inventario próximo a vencer

### 2.2 Impacto

- Ruptura del ciclo económico con pérdidas para las farmacias por productos descartados antes de completar su vida útil
- Oportunidades desaprovechadas para extender el ciclo de vida comercial de los productos mediante descuentos
- Ineficiencia sistémica en la gestión de inventario farmacéutico que impide la circularidad
- Impacto ambiental negativo por el desecho prematuro de medicamentos y sus empaques que podrían ser utilizados

## 3. Objetivos

### 3.1 Objetivo General

Desarrollar una plataforma digital basada en principios de economía circular que redefina el ciclo de vida comercial de productos farmacéuticos, conectando estratégicamente farmacias con clientes finales para la comercialización de productos próximos a vencer. Este ecosistema circular maximizará el valor de los productos hasta el final de su vida útil, convirtiendo potenciales residuos en oportunidades de consumo responsable con beneficios económicos, sociales y ambientales para todos los participantes.

### 3.2 Objetivos Específicos

1. **Eficiencia comercial**: Reducir las mermas por vencimiento en farmacias participantes en un mínimo del 30% durante los primeros 12 meses de operación, medible a través de reportes mensuales comparativos.

2. **Ahorro para consumidores**: Implementar una estructura de descuentos escalonada (20%-50%) basada en la proximidad de vencimiento, garantizando un ahorro promedio mínimo del 25% para los usuarios finales.

3. **Gestión inteligente**: Desarrollar e implementar un sistema de inventario con algoritmos predictivos que identifique automáticamente productos en riesgo de vencimiento y genere alertas con 60 días de anticipación.

4. **Experiencia digital**: Diseñar una interfaz que logre una puntuación mínima de 85/100 en pruebas de usabilidad, con una tasa de abandono inferior al 20% en el proceso de generación de tickets.

5. **Adopción del sistema**: Alcanzar una red de al menos 100 farmacias activas y 10,000 usuarios registrados durante los primeros 6 meses post-lanzamiento.

6. **Seguridad y cumplimiento**: Implementar protocolos de seguridad que cumplan con estándares ISO 27001 y normativas de protección de datos (Ley 19.628), con auditorías trimestrales de seguridad y sin incidentes críticos.

7. **Impacto ambiental**: Contribuir a la reducción de residuos farmacéuticos documentando la comercialización efectiva de al menos 50,000 productos que de otro modo serían descartados, durante el primer año.

## 4. Alcance del Proyecto

### 4.1 Incluido

- Desarrollo de aplicación web responsive
- Desarrollo de aplicación móvil nativa
- Sistema de gestión de inventario
- Sistema de tickets digitales
- Integración con servicios de geolocalización
- Sistema de notificaciones
- Panel de administración
- Integración con Firebase
- Documentación técnica y de usuario

### 4.2 No Incluido

- Desarrollo de hardware específico
- Servicios de logística de entrega
- Gestión de pagos (integración con pasarela existente)
- Desarrollo de sistemas de farmacia existentes

## 5. Estimaciones

### 5.1 Timeline

- Fase 1 (Planificación y Diseño): 4 semanas
- Fase 2 (Desarrollo Web): 12 semanas
- Fase 3 (Desarrollo Móvil): 10 semanas
- Fase 4 (Integración y Pruebas): 6 semanas
- Fase 5 (Despliegue y Lanzamiento): 2 semanas

Total estimado: 34 semanas (aproximadamente 8 meses)

### 5.2 Recursos Requeridos

- 1 Project Manager
- 1 Desarrolladores Frontend (Nuxt 3)
- 1 Desarrolladores Móvil (Flutter)
- 1 Desarrollador Backend (Firebase)
- 1 Diseñador UI/UX
- 1 QA Engineer

### 5.3 Costos Estimados

#### 5.3.1 Estimación por Recursos Humanos (en CLP)

| Rol                              | Valor Hora (CLP) | Horas Semanales | Fases   | Semanas | Total (CLP)      |
| -------------------------------- | ---------------- | --------------- | ------- | ------- | ---------------- |
| Project Manager                  | $25.000          | 40              | 1-5     | 34      | $34.000.000      |
| Desarrollador Frontend Senior    | $22.000          | 40              | 2, 4    | 18      | $15.840.000      |
| Desarrollador Frontend Mid       | $18.000          | 40              | 3, 4    | 16      | $14.400.000      |
| Desarrollador Móvil Senior       | $22.000          | 40              | 3, 4    | 16      | $14.080.000      |
| Desarrollador Móvil Mid          | $18.000          | 40              | 3, 4    | 16      | $14.400.000      |
| Desarrollador Backend (Firebase) | $22.000          | 40              | 2, 3, 4 | 28      | $24.640.000      |
| Diseñador UI/UX                  | $20.000          | 40              | 1, 2, 3 | 26      | $20.800.000      |
| QA Engineer                      | $18.000          | 40              | 2, 3, 4 | 28      | $20.160.000      |
| **Total Recursos Humanos**       |                  |                 |         |         | **$129.520.000** |

**Detalle de participación por fase:**

- Fase 1 (Planificación y Diseño): Project Manager, Diseñador UI/UX
- Fase 2 (Desarrollo Web): Project Manager, Desarrollador Frontend, Desarrollador Backend, Diseñador UI/UX, QA Engineer
- Fase 3 (Desarrollo Móvil): Project Manager, Desarrollador Móvil, Desarrollador Backend, Diseñador UI/UX, QA Engineer
- Fase 4 (Integración y Pruebas): Project Manager, Desarrollador Frontend, Desarrollador Móvil, Desarrollador Backend, QA Engineer
- Fase 5 (Despliegue y Lanzamiento): Project Manager

#### 5.3.2 Costos de Infraestructura y Servicios

| Ítem                                  | Costo Mensual (CLP) | Meses | Total (CLP)     |
| ------------------------------------- | ------------------- | ----- | --------------- |
| Firebase/GCP                          | $500.000            | 12    | $6.000.000      |
| Licencias y servicios externos        | $350.000            | 12    | $4.200.000      |
| Marketing y lanzamiento               |                     |       | $15.000.000     |
| **Total Infraestructura y Servicios** |                     |       | **$25.200.000** |

#### 5.3.3 Costos Totales del Proyecto

| Categoría                   | Costo (CLP)      |
| --------------------------- | ---------------- |
| Recursos Humanos            | $129.520.000     |
| Infraestructura y Servicios | $25.200.000      |
| Contingencia (10%)          | $15.472.000      |
| **TOTAL PROYECTO**          | **$170.192.000** |

_Nota: Los valores hora están basados en el mercado tecnológico chileno actual (2024-2025) para profesionales con experiencia media-alta. La distribución de recursos se ha optimizado considerando las necesidades específicas de cada fase del proyecto._

## 6. Producto Mínimo Viable (MVP)

El MVP de FarmaciaDescuento se enfoca en las funcionalidades esenciales que permiten validar la propuesta de valor con usuarios reales, minimizando el tiempo de desarrollo y los recursos necesarios para el lanzamiento inicial.

### 6.1 Componentes del MVP

#### 6.1.1 Plataforma Web Responsive

- **Página de inicio** con valor de propuesta clara
- **Catálogo de productos** con filtros básicos (categoría, farmacia, descuento)
- **Página de detalle de producto** con información esencial
- **Listado de farmacias** con información de contacto y ubicación
- **Generación de tickets** de descuento con código QR
- **Registro y autenticación** para usuarios y farmacias

#### 6.1.2 Portal para Farmacias

- **Dashboard básico** para gestión de productos
- **Carga y actualización** de productos con descuento
- **Validación de tickets** generados por clientes
- **Reportes simples** de actividad

#### 6.1.3 Funcionalidades Priorizadas

1. **Búsqueda y descubrimiento** de productos con descuento
2. **Generación de tickets** de descuento válidos en farmacias
3. **Gestión básica** de inventario para farmacias
4. **Validación de tickets** en punto de venta

### 6.2 Elementos No Incluidos en el MVP

- Aplicación móvil nativa (se usará web responsive)
- Integración con sistemas de farmacia existentes
- Sistema avanzado de análisis y reportes
- Funcionalidades de marketing y fidelización
- Módulo de entrega a domicilio
- Sistema de valoraciones y reseñas

### 6.3 Métricas para Validación del MVP

Para evaluar el éxito del MVP y tomar decisiones sobre el desarrollo futuro, se medirán:

1. **Tasa de registro** de usuarios y farmacias
2. **Tasa de generación** de tickets
3. **Tasa de validación** (tickets usados vs. generados)
4. **Retención de usuarios** (retorno a la plataforma)
5. **Feedback cualitativo** de usuarios y farmacias

### 6.4 Cronograma del MVP

- **Semana 1-2**: Diseño de UI/UX y arquitectura base
- **Semana 3-6**: Desarrollo de funcionalidades de usuario final
- **Semana 7-9**: Desarrollo de portal para farmacias
- **Semana 10-11**: Pruebas y correcciones
- **Semana 12**: Lanzamiento con farmacias piloto

## 7. Riesgos y Mitigación

### 7.1 Riesgos Técnicos

- **Riesgo**: Complejidad en la integración con sistemas de farmacia
  **Mitigación**: Desarrollo de API estándar y documentación clara

- **Riesgo**: Problemas de escalabilidad
  **Mitigación**: Arquitectura basada en microservicios y uso de servicios cloud

### 7.2 Riesgos de Negocio

- **Riesgo**: Baja adopción por parte de farmacias
  **Mitigación**: Programa piloto con farmacias seleccionadas

- **Riesgo**: Resistencia al cambio por parte de usuarios
  **Mitigación**: Campaña educativa y soporte técnico dedicado

## 8. Métricas de Éxito

### 8.1 KPIs Técnicos

- Tiempo de carga de página < 2 segundos
- Disponibilidad del sistema > 99.9%
- Tasa de error < 0.1%

### 8.2 KPIs de Negocio

- Número de farmacias registradas
- Número de usuarios activos
- Porcentaje de reducción de mermas
- Tasa de conversión de tickets
- Satisfacción del usuario (NPS)

## 9. Stack Tecnológico

### 9.1 Frontend Web

- Framework: Nuxt 3
- Lenguaje: TypeScript
- Gestión de Estado: Pinia
- UI Framework: Tailwind CSS

### 9.2 Aplicación Móvil

- Framework: Flutter
- Lenguaje: Dart
- Arquitectura: BLoC

### 9.3 Backend

- Plataforma: Firebase
- Base de datos: Firestore
- Autenticación: Firebase Auth
- Storage: Firebase Storage
- Functions: Firebase Functions

### 9.4 Infraestructura

- Hosting: Firebase Hosting
- CI/CD: GitHub Actions
- Monitoreo: Sentry
- Analytics: Google Analytics

## 10. Plan de Implementación

### 10.1 Fase 1: Planificación y Diseño

- Definición de requerimientos detallados
- Diseño de arquitectura
- Creación de wireframes
- Definición de guías de estilo

### 10.2 Fase 2: Desarrollo Web

- Configuración de proyecto Nuxt 3
- Desarrollo de componentes base
- Implementación de funcionalidades core
- Integración con Firebase

### 10.3 Fase 3: Desarrollo Móvil

- Configuración de proyecto Flutter
- Desarrollo de UI/UX
- Implementación de funcionalidades
- Integración con servicios

### 10.4 Fase 4: Integración y Pruebas

- Pruebas de integración
- Pruebas de rendimiento
- Pruebas de seguridad
- Optimización

### 10.5 Fase 5: Despliegue y Lanzamiento

- Despliegue en producción
- Monitoreo post-lanzamiento
- Recopilación de feedback
- Plan de mejora continua

## 11. Consideraciones Legales y Regulatorias

### 11.1 Normativa Farmacéutica

- La plataforma NO vende medicamentos directamente
- La plataforma solo genera tickets de descuento
- Las farmacias son las únicas responsables de la venta de productos
- Cumplimiento con la Ley 20.584 sobre derechos y deberes de los pacientes
- Cumplimiento con el Código Sanitario chileno
- Cumplimiento con la Ley 19.496 sobre protección de los derechos de los consumidores
- Cumplimiento con la Ley 20.584 sobre derechos y deberes de los pacientes

### 11.2 Protección de Datos

- Cumplimiento con la Ley 19.628 sobre protección de datos personales
- Política de privacidad clara y accesible
- Consentimiento explícito para el uso de datos
- Protocolos de seguridad para datos sensibles

### 11.3 Términos y Condiciones

- Condiciones claras de uso para farmacias y clientes
- Responsabilidades y obligaciones de cada parte
- Proceso de resolución de conflictos
- Políticas de cancelación y reembolso

## 12. Sostenibilidad y Mantenimiento

### 12.1 Plan de Mantenimiento

- Actualizaciones de seguridad mensuales
- Mejoras de rendimiento trimestrales
- Nuevas funcionalidades según roadmap

### 12.2 Modelo de Negocio

#### Planes para Farmacias

1. **Plan Básico (Gratuito)**

   - Límite de 100 tickets mensuales
   - Acceso a dashboard básico
   - Notificaciones por email
   - Soporte por email

2. **Plan Premium**
   - Tickets ilimitados
   - Dashboard avanzado con analytics
   - Notificaciones push
   - Soporte prioritario
   - Integración con sistemas de farmacia
   - Reportes personalizados
   - Comisión por transacción: 5% del valor del ticket

#### Comisiones

- Comisión por transacción: 5% del valor del ticket
- Comisión aplicable solo en el Plan Premium
- No hay comisión en el Plan Básico

#### Beneficios Adicionales

- Programa de fidelización para farmacias frecuentes
- Capacitación y soporte técnico
- Acceso a webinars y material educativo
- Participación en programa de referidos

## 13. Roadmap del Proyecto

### 13.1 Fase Post-MVP (Q1-Q2)

#### Plataforma Web

- Implementación de sistema de valoraciones y reseñas para productos
- Perfiles de usuario avanzados con historial de compras
- Suscripciones a alertas de productos próximos a vencer
- Filtros avanzados de búsqueda y comparación de precios
- Integraciones con sistemas de seguros de salud

#### Portal para Farmacias

- Automatización de inventario y alertas predictivas
- Herramientas avanzadas de gestión de descuentos
- Panel de análisis de tendencias de consumo
- Integración con sistemas de punto de venta
- Funcionalidades de marketing segmentado

### 13.2 Desarrollo de Aplicación Móvil (Q3)

#### App para Clientes

- Versiones nativas para Android e iOS
- Escaneo de códigos de barras para búsqueda de productos
- Geolocalización para farmacias cercanas con productos de interés
- Notificaciones personalizadas basadas en preferencias
- Modo offline para consulta de tickets generados

#### App para Farmacias

- Gestión móvil de inventario
- Escaneo rápido de productos para actualización
- Dashboards en tiempo real de ventas y promociones
- Notificaciones de nuevas reservas de productos
- Comunicación directa con clientes

### 13.3 Expansión de Funcionalidades (Q4)

- Programa de fidelización y puntos por compras recurrentes
- Sistema de recomendaciones personalizadas
- Foros de comunidad y educación sobre uso responsable de medicamentos
- Integración con delivery para productos no farmacéuticos
- Expansión a categorías adicionales (cuidado personal, suplementos)

### 13.4 Consolidación y Escalabilidad (Año 2)

- Plataforma B2B para relaciones fabricante-farmacia
- Herramientas de marketing de contenido para farmacias
- API pública para desarrolladores
- Expansión a mercados adicionales
- Análisis predictivo avanzado para optimización de inventario

### 13.5 Priorización de Funcionalidades

La priorización de funcionalidades se realizará considerando:

1. **Valor para el usuario**: Impacto directo en la experiencia del cliente o farmacia
2. **Complejidad técnica**: Recursos necesarios y viabilidad de implementación
3. **Potencial de monetización**: Contribución al modelo de negocio
4. **Feedback del MVP**: Respuesta a necesidades identificadas en la fase inicial

Este roadmap será revisado trimestralmente para adaptarse a:

- Feedback de usuarios
- Evolución del mercado
- Resultados de negocio
- Oportunidades tecnológicas emergentes

## 14. Conclusión

Farmacia Descuento representa una solución innovadora para un problema real en el sector farmacéutico. La plataforma no solo generará beneficios económicos para las farmacias y ahorros para los clientes, sino que también contribuirá a reducir el desperdicio de productos farmacéuticos. El proyecto está técnicamente bien fundamentado y cuenta con un plan de implementación claro y realista.
