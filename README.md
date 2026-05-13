# CivicData Viewer

CivicData Viewer es un visualizador web de datos cívicos desarrollado con tecnologías frontend modernas. Permite consultar, filtrar y buscar información de usuarios organizados por regiones de Chile.

## 🎯 Objetivo

Construir una plataforma web interactiva que permita:

- ✅ Visualizar datos en formato de tabla
- ✅ Consultar información por nombre, RUT o región
- ✅ Filtrar datos dinámicamente
- ✅ Formatear información según estándares chilenos
- 🔄 Evolucionar hacia una arquitectura completa con backend y base de datos

## 📁 Estructura del Proyecto

```
CivicData Viewer/
│
├── index.html                 # Página principal
├── README.md                  # Este archivo
├── .gitignore                 # Archivo de exclusiones Git
│
├── /css
│   └── styles.css            # Estilos responsivos (Desktop, Tablet, Mobile)
│
├── /js
│   └── app.js                # Lógica de la aplicación
│
├── /data
│   └── sample-data.json      # Datos de prueba en formato JSON
│
└── /assets
    └── (Imágenes y recursos futuros)
```

## ✨ Características Implementadas

### 1. Interfaz de Usuario
- **Header profesional** con gradiente y título
- **Panel de filtros** con búsqueda y selector de regiones
- **Tabla de datos** con diseño responsivo
- **Footer** con información del proyecto
- **Diseño responsive** para Desktop, Tablet y Mobile

### 2. Búsqueda y Filtrado
- 🔍 **Búsqueda por nombre** (case-insensitive)
- 🔍 **Búsqueda por RUT** (formato flexible: con o sin puntos/guión)
- 🗺️ **Filtro por región** de Chile
- 🔄 **Filtrado combinado** (búsqueda + región simultáneamente)
- ⚡ **Búsqueda en tiempo real** (mientras escribes)

### 3. Formato de Datos
- 📌 **RUT formateado** en formato chileno: `##.###.###-#`
- 💰 **Moneda formateada** en pesos chilenos con separadores de miles
- 📊 **Datos organizados** por región de Chile

### 4. Carga Dinámica
- 📥 **Carga automática de datos** desde archivo JSON
- 🔄 **Generación automática del selector de regiones**
- 📋 **Tabla dinámica** que se actualiza en tiempo real

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos responsivos con variables CSS
- **JavaScript (Vanilla)** - Lógica de negocio sin dependencias
- **JSON** - Formato de datos
- **Git** - Control de versiones

## 🚀 Cómo Usar

### Opción 1: Abrir en Navegador
1. Navega a la carpeta del proyecto: `CivicData Viewer/`
2. Haz clic derecho en `index.html`
3. Selecciona "Abrir con" y elige tu navegador preferido

### Opción 2: Usar un Servidor Local
```bash
# Si tienes Python 3 instalado
python -m http.server 8000

# Si tienes Node.js instalado
npx http-server

# Luego accede a http://localhost:8000
```

## 📊 Datos Disponibles

El archivo `data/sample-data.json` contiene:
- **10 registros de prueba**
- **Información de usuarios** (RUT, Nombre, Región, Monto)
- **Regiones incluidas**: Metropolitana, Valparaíso, Los Lagos, Biobío, Antofagasta, Coquimbo, Maule, Los Ríos

**Nota**: Los datos son únicamente de demostración con propósito educativo.

## 💻 Funciones JavaScript Principales

### `cargarDatos()`
Carga los datos desde el archivo JSON de forma asíncrona y renderiza la tabla inicial.

### `cargarRegiones()`
Extrae automáticamente todas las regiones únicas de los datos y llena el selector.

### `filtrarDatos(texto, region)`
Filtra los datos según búsqueda de texto y región seleccionada.

### `formatearRUT(rut)`
Convierte un RUT al formato chileno: `##.###.###-#`

### `mostrarDatos(data)`
Renderiza dinámicamente las filas de la tabla con los datos proporcionados.

## 🎨 Características de Diseño

- **Paleta de colores moderna**
  - Primario: `#2c3e50` (Azul oscuro)
  - Secundario: `#3498db` (Azul cielo)
  - Fondo: `#ecf0f1` (Gris claro)

- **Efectos visuales**
  - Hover en filas (cambio de fondo)
  - Transiciones suaves en inputs y botones
  - Sombras para profundidad
  - Gradiente en header

- **Diseño responsivo**
  - Desktop (1200px+): Layout completo
  - Tablet (768px-1199px): Ajustes de padding y font-size
  - Mobile (480px-767px): Optimización para pantallas pequeñas

## 📌 Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Sin dependencias externas
- Sin instalación requerida

## 🔄 Roadmap del Proyecto

- ✅ **Fase 1**: Visualización de datos (tabla + filtros)
- ✅ **Fase 1.5**: Formateo de RUT y moneda
- ✅ **Fase 1.6**: Filtro por región
- 🔄 **Fase 2**: Sistema de consulta avanzado (búsqueda por rango de montos, fechas)
- 🔜 **Fase 3**: Backend con PHP/Node.js + Base de datos MySQL
- 🔜 **Fase 4**: Interfaz moderna con Vue.js o React
- 🔜 **Fase 5**: Autenticación y permisos de usuario
- 🔜 **Fase 6**: Exportación de reportes (PDF, Excel)

## 🚀 Pasos Siguientes

1. **Expansión de datos**: Integrar con base de datos real
2. **Backend**: Crear API REST para servir datos
3. **Autenticación**: Sistema de login de usuarios
4. **Reportes**: Generar reportes en diferentes formatos
5. **Dashboard**: Vista estadística de los datos

## 📝 Notas de Desarrollo

- El proyecto utiliza JavaScript vanilla (sin frameworks)
- Se siguen las mejores prácticas de código limpio
- Cada función está documentada con comentarios
- El CSS utiliza variables personalizadas para fácil personalización
- Los datos se cargan de forma asíncrona para mejor rendimiento

## 🧠 Conceptos Aprendidos

- Selección y manipulación del DOM
- Eventos en JavaScript
- Fetch API para carga de datos
- Array methods (filter, map, forEach)
- Funciones asincrónicas (async/await)
- Template literals
- Diseño responsive con CSS Media Queries
- Git y GitHub

## 📧 Información

**Autor**: Eduardo Javier Perez Espindola
**Certifido**: Desarrollador Web Frontend Trainee
**Fecha de inicio**: Mayo 2026  
**Repositorio**: https://github.com/EduardoJavier45/-civicdata-viewer.git  
**Licencia**: MIT

## 📞 Soporte

Para reportar issues o sugerencias, contacta al desarrollador o crea un issue en GitHub.

## 📌 Estado actual

🟢 Fase 1 en desarrollo