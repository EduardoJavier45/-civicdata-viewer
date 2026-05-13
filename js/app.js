// ========================================
// FUNCIÓN: extraerCampos(objeto)
// ========================================
// Extrae los campos relevantes del registro
// Maneja diferentes nombres de campos según la fuente de datos
function extraerCampos(persona) {
    return {
        rut: persona.rut || persona.RUT || persona.Rut || '',
        dv: persona.dv || persona.DV || persona.Dv || '',
        nombre: persona.nombre || persona.NOMBRE || persona.nombre_completo || persona['NOMBRE COMPLETO'] || '',
        tipoNotificacion: persona['TIPO NOTIFICACIÓN'] || persona.tipo_notificacion || persona.tipoNotificacion || '',
        montoReintegro: persona['MONTO DE REINTEGRO REAL'] || persona.monto || persona.MONTO || persona.monto_reintegro || '0',
        ipc: persona.IPC || persona.ipc || '',
        montoReajustado: persona['ANUAL 2024 REAJUSTADO'] || persona.monto_reajustado || '',
        region: persona.region || persona.REGIÓN || persona.Region || persona.REGION || '',
        comuna: persona.COMUNA || persona.comuna || '',
        email: persona.EMAIL || persona.email || '',
        telefono: persona.TELÉFONO || persona.telefono || '',
        glosa: persona.GLOSA || persona.glosa || '',
        fechaNacimiento: persona['FECHA DE NACIMIENTO'] || persona.fecha_nacimiento || '',
        fibe: persona.FIBE || persona.fibe || ''
    };
}

// ========================================
// FUNCIÓN: limpiarDatos(datos)
// ========================================
// Convierte datos numéricos de cadenas a números reales
function limpiarDatos(data) {
    return data.map(persona => {
        const registro = extraerCampos(persona);
        
        // Convertir monto a número, removiendo símbolos de moneda
        if (typeof registro.montoReintegro === 'string') {
            registro.montoReintegro = parseInt(registro.montoReintegro.replace(/[^\d]/g, '')) || 0;
        }
        
        // Convertir monto reajustado
        if (typeof registro.montoReajustado === 'string') {
            registro.montoReajustado = parseInt(registro.montoReajustado.replace(/[^\d]/g, '')) || 0;
        }
        
        // Limpiar espacios en blanco
        registro.nombre = registro.nombre.trim();
        registro.region = registro.region.trim();
        registro.rut = registro.rut.trim();
        
        return registro;
    });
}

// ========================================
// VARIABLE GLOBAL - Almacenamiento de datos
// ========================================
let listaDatos = [];

// ========================================
// FUNCIÓN: formatearRUT(rut)
// ========================================
// Formatea el RUT al formato chileno ##.###.###-#
// Ejemplo: 11111111 -> 11.111.111-1
function formatearRUT(rut) {
    // Eliminar caracteres no numéricos
    rut = rut.toString().replace(/[^\d]/g, '');
    
    // Si el RUT tiene menos de 8 dígitos, retornarlo sin formato
    if (rut.length < 8) {
        return rut;
    }
    
    // Separar el dígito verificador (últimos 2 caracteres)
    const dv = rut.slice(-1);
    const numeros = rut.slice(0, -1);
    
    // Formatear con puntos y guión: ##.###.###-#
    const formateado = numeros.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.').padStart(10, '0');
    
    return formateado + '-' + dv;
}
async function cargarDatos() {
    try {
        const response = await fetch('data/data.json');
        const data = await response.json();

        // Limpiar y estandarizar datos
        listaDatos = limpiarDatos(Array.isArray(data) ? data : [data]);
        mostrarDatos(listaDatos);
        cargarRegiones();
        
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

// ========================================
// FUNCIÓN: cargarRegiones()
// ========================================
// Extrae todas las regiones únicas de los datos
// y carga las opciones en el select
function cargarRegiones() {
    const selectRegion = document.getElementById('filtro-region');
    
    // Obtener regiones únicas del array de datos
    const regiones = [...new Set(listaDatos.map(persona => persona.region))].sort();
    
    // Limpiar opciones existentes (excepto la primera)
    while (selectRegion.options.length > 1) {
        selectRegion.remove(1);
    }
    
    // Agregar las regiones como opciones
    regiones.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        selectRegion.appendChild(option);
    });
}

// ========================================
// FUNCIÓN: filtrarDatos(texto, region)
// ========================================
// Filtra datos por búsqueda de texto y por región
function filtrarDatos(texto = '', region = '') {
    let resultado = listaDatos;
    
    // Filtrar por región si se selecciona una
    if (region) {
        resultado = resultado.filter(persona => persona.region === region);
    }
    
    // Filtrar por texto de búsqueda
    if (texto) {
        // Limpiar el texto de búsqueda de caracteres especiales para comparación de RUT
        const textoBusqueda = texto.replace(/[^\d]/g, '');
        
        resultado = resultado.filter(persona => {
            return (
                persona.nombre.toLowerCase().includes(texto.toLowerCase()) ||
                persona.rut.replace(/[^\d]/g, '').includes(textoBusqueda)
            );
        });
    }

    mostrarDatos(resultado);
}

// ========================================
// FUNCIÓN: mostrarDatos(data)
// ========================================
function mostrarDatos(data) {
    const tbody = document.querySelector("#data-table tbody");

    tbody.innerHTML = "";

    if (!data || data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="13" style="text-align: center; padding: 20px;">No se encontraron resultados</td>
            </tr>
        `;
        return;
    }

    data.forEach(persona => {
        const fila = `
            <tr>
                <td>${formatearRUT(persona.rut)}</td>
                <td>${persona.nombre}</td>
                <td>${persona.region}</td>
                <td>${persona.comuna}</td>
                <td>$${persona.montoReintegro.toLocaleString('es-CL')}</td>
                <td>$${persona.montoReajustado.toLocaleString('es-CL')}</td>
                <td>${persona.tipoNotificacion}</td>
                <td>${persona.email}</td>
                <td>${persona.telefono}</td>
                <td>${persona.fechaNacimiento}</td>
                <td title="${persona.glosa}" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${persona.glosa}</td>
                <td>${persona.ipc}</td>
                <td>${persona.fibe}</td>
            </tr>
        `;

        tbody.innerHTML += fila;
    });
}

// ========================================
// EVENT LISTENERS - Interactividad
// ========================================

document.addEventListener("DOMContentLoaded", function() {
    const inputBusqueda = document.getElementById("search");
    const selectRegion = document.getElementById("filtro-region");

    // Evento para búsqueda por texto
    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", (e) => {
            const texto = e.target.value;
            const region = selectRegion.value;
            filtrarDatos(texto, region);
        });
    }

    // Evento para filtrado por región
    if (selectRegion) {
        selectRegion.addEventListener("change", (e) => {
            const region = e.target.value;
            const texto = inputBusqueda.value;
            filtrarDatos(texto, region);
        });
    }

    // Cargar datos al iniciar
    cargarDatos();
});
