const baseUrl = 'http://localhost:8080';

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const section = btn.dataset.section;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');
    });
});

// Color picker sync
const colorPicker = document.getElementById('colorPicker');
const colorInput = document.getElementById('color');

if (colorPicker && colorInput) {
    colorPicker.addEventListener('input', (e) => {
        colorInput.value = e.target.value.toUpperCase();
    });

    colorInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            colorPicker.value = value;
        }
    });
}

// Show/Hide Forms
let editingVehiculoId = null;

document.getElementById('toggleVehiculoForm')?.addEventListener('click', async () => {
    await toggleVehiculoForm();
});

async function toggleVehiculoForm(vehiculo = null) {
    const form = document.getElementById('vehiculoFormCard');
    const isHidden = form.style.display === 'none';
    const formTitle = document.querySelector('#vehiculoFormCard h3');
    const submitBtn = document.querySelector('#vehiculoForm button[type="submit"]');
    
    // Referencias a los campos de documento
    const documentoSelect = document.getElementById('documentoSelect');
    const fechaExpedicion = document.getElementById('fechaExpedicion');
    const fechaVencimiento = document.getElementById('fechaVencimiento');
    const documentosSection = document.querySelector('.documentos-section');
    
    if (vehiculo) {
        // Modo edición
        editingVehiculoId = vehiculo.id;
        formTitle.textContent = 'Editar Vehículo';
        submitBtn.textContent = 'Actualizar Vehículo';
        
        // Cargar datos del vehículo
        document.getElementById('tipoVehiculo').value = vehiculo.tipoVehiculo;
        document.getElementById('placa').value = vehiculo.placa;
        document.getElementById('tipoServicio').value = vehiculo.tipoServicio;
        document.getElementById('combustible').value = vehiculo.combustible;
        document.getElementById('capacidadPasajeros').value = vehiculo.capacidadPasajeros;
        document.getElementById('color').value = vehiculo.color;
        document.getElementById('colorPicker').value = vehiculo.color;
        document.getElementById('modelo').value = vehiculo.modelo;
        document.getElementById('marca').value = vehiculo.marca;
        document.getElementById('linea').value = vehiculo.linea;
        
        // En modo edición, ocultar y deshabilitar campos de documentos
        documentosSection.style.display = 'none';
        documentoSelect.disabled = true;
        fechaExpedicion.disabled = true;
        fechaVencimiento.disabled = true;
        documentoSelect.removeAttribute('required');
        fechaExpedicion.removeAttribute('required');
        fechaVencimiento.removeAttribute('required');
        
        form.style.display = 'block';
        await loadDocumentosSelect();
    } else if (isHidden) {
        // Modo creación
        editingVehiculoId = null;
        formTitle.textContent = 'Nuevo Vehículo';
        submitBtn.textContent = 'Guardar Vehículo';
        document.getElementById('vehiculoForm').reset();
        
        // Habilitar campos de documentos
        documentosSection.style.display = 'block';
        documentoSelect.disabled = false;
        fechaExpedicion.disabled = false;
        fechaVencimiento.disabled = false;
        documentoSelect.setAttribute('required', 'required');
        fechaExpedicion.setAttribute('required', 'required');
        fechaVencimiento.setAttribute('required', 'required');
        
        form.style.display = 'block';
        await loadDocumentosSelect();
    } else {
        // Cerrar formulario
        form.style.display = 'none';
        editingVehiculoId = null;
        document.getElementById('vehiculoForm').reset();
        
        // Restaurar campos de documentos
        documentosSection.style.display = 'block';
        documentoSelect.disabled = false;
        fechaExpedicion.disabled = false;
        fechaVencimiento.disabled = false;
        documentoSelect.setAttribute('required', 'required');
        fechaExpedicion.setAttribute('required', 'required');
        fechaVencimiento.setAttribute('required', 'required');
    }
}

// Cargar documentos en el select
async function loadDocumentosSelect() {
    try {
        const response = await fetch(`${baseUrl}/api/documentos`);
        const documentos = await response.json();
        const select = document.getElementById('documentoSelect');
        
        select.innerHTML = '<option value="">Seleccionar documento...</option>';
        documentos.forEach(d => {
            const option = document.createElement('option');
            option.value = d.id;
            option.textContent = `${d.nombre} (${d.codigo})`;
            select.appendChild(option);
        });
        
        if (documentos.length === 0) {
            showToast('No hay documentos registrados. Crea documentos primero.', 'error');
        }
    } catch (error) {
        console.error('Error cargando documentos:', error);
        showToast('Error al cargar documentos', 'error');
    }
}

document.getElementById('cancelVehiculo')?.addEventListener('click', () => {
    const form = document.getElementById('vehiculoFormCard');
    const vehiculoForm = document.getElementById('vehiculoForm');
    const documentosSection = document.querySelector('.documentos-section');
    const documentoSelect = document.getElementById('documentoSelect');
    const fechaExpedicion = document.getElementById('fechaExpedicion');
    const fechaVencimiento = document.getElementById('fechaVencimiento');
    
    form.style.display = 'none';
    vehiculoForm.reset();
    editingVehiculoId = null;
    
    // Restaurar título y botón
    document.querySelector('#vehiculoFormCard h3').textContent = 'Nuevo Vehículo';
    document.querySelector('#vehiculoForm button[type="submit"]').textContent = 'Guardar Vehículo';
    
    // Restaurar campos de documentos
    documentosSection.style.display = 'block';
    documentoSelect.disabled = false;
    fechaExpedicion.disabled = false;
    fechaVencimiento.disabled = false;
    documentoSelect.setAttribute('required', 'required');
    fechaExpedicion.setAttribute('required', 'required');
    fechaVencimiento.setAttribute('required', 'required');
});

document.getElementById('toggleDocumentoForm')?.addEventListener('click', () => {
    const form = document.getElementById('documentoFormCard');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('cancelDocumento')?.addEventListener('click', () => {
    document.getElementById('documentoFormCard').style.display = 'none';
    document.getElementById('documentoForm').reset();
    
    // Resetear modo edición
    editingDocumentoId = null;
    const submitBtn = document.querySelector('#documentoForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Guardar Documento';
});

// Search options
document.querySelectorAll('.search-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.search-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.search-form').forEach(f => f.style.display = 'none');
        const searchType = btn.dataset.search;
        document.getElementById(`searchForm${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`).style.display = 'flex';
    });
});

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Load Vehiculos
async function loadVehiculos() {
    try {
        const response = await fetch(`${baseUrl}/api/vehiculos`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Respuesta no es JSON:', text);
            throw new Error('La respuesta del servidor no es JSON');
        }
        
        const vehiculos = await response.json();
        const list = document.getElementById('vehiculosList');
        const noData = document.getElementById('noVehiculos');
        
        if (vehiculos.length === 0) {
            list.innerHTML = '';
            noData.style.display = 'block';
            return;
        }
        
        noData.style.display = 'none';
        list.innerHTML = vehiculos.map(v => createVehiculoCard(v)).join('');
    } catch (error) {
        console.error('Error completo al cargar vehículos:', error);
        showToast('Error al cargar vehículos: ' + error.message, 'error');
    }
}

function createVehiculoCard(v) {
    const tipoBadge = v.tipoVehiculo === 'AUTOMOVIL' ? 'primary' : 
                      v.tipoVehiculo === 'MOTOCICLETA' ? 'success' : 'warning';
    
    return `
        <div class="list-item">
            <div class="list-item-header">
                <div class="list-item-title">${v.placa}</div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <span class="list-item-badge badge-${tipoBadge}">${v.tipoVehiculo}</span>
                    <button class="btn-icon btn-edit" data-vehiculo-id="${v.id}" title="Editar">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-danger btn-delete" data-vehiculo-id="${v.id}" data-vehiculo-placa="${v.placa}" title="Eliminar">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="list-item-details">
                <div class="detail-item">
                    <span class="detail-label">Marca</span>
                    <span class="detail-value">${v.marca}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Línea</span>
                    <span class="detail-value">${v.linea}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Modelo</span>
                    <span class="detail-value">${v.modelo}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Combustible</span>
                    <span class="detail-value">${v.combustible}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Servicio</span>
                    <span class="detail-value">${v.tipoServicio}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Pasajeros</span>
                    <span class="detail-value">${v.capacidadPasajeros}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Color</span>
                    <span class="detail-value">
                        <span style="display: inline-block; width: 20px; height: 20px; background: ${v.color}; border-radius: 4px; vertical-align: middle; margin-right: 5px;"></span>
                        ${v.color}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Load Documentos
async function loadDocumentos() {
    try {
        const response = await fetch(`${baseUrl}/api/documentos`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Respuesta no es JSON:', text);
            throw new Error('La respuesta del servidor no es JSON');
        }
        
        const documentos = await response.json();
        const list = document.getElementById('documentosList');
        const noData = document.getElementById('noDocumentos');
        
        if (documentos.length === 0) {
            list.innerHTML = '';
            noData.style.display = 'block';
            return;
        }
        
        noData.style.display = 'none';
        list.innerHTML = documentos.map(d => createDocumentoCard(d)).join('');
    } catch (error) {
        console.error('Error completo al cargar documentos:', error);
        showToast('Error al cargar documentos: ' + error.message, 'error');
    }
}

function createDocumentoCard(d) {
    const tipoText = d.tipoVehiculoAplica === 'A' ? 'Automóvil' :
                     d.tipoVehiculoAplica === 'M' ? 'Motocicleta' : 'Ambos';
    const obligatorioText = d.obligatorio === 'RA' ? 'Req. Automóvil' :
                           d.obligatorio === 'RM' ? 'Req. Motocicleta' : 'Req. Ambos';
    
    return `
        <div class="list-item">
            <div class="list-item-header">
                <div class="list-item-title">${d.nombre}</div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <span class="list-item-badge badge-primary">${d.codigo}</span>
                    <button class="btn-icon btn-edit-doc" data-doc-id="${d.id}" title="Editar">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-danger btn-delete-doc" data-doc-id="${d.id}" data-doc-nombre="${d.nombre}" title="Eliminar">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="list-item-details">
                <div class="detail-item">
                    <span class="detail-label">Aplica para</span>
                    <span class="detail-value">${tipoText}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Obligatorio</span>
                    <span class="detail-value">${obligatorioText}</span>
                </div>
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <span class="detail-label">Descripción</span>
                    <span class="detail-value">${d.descripcion || 'Sin descripción'}</span>
                </div>
            </div>
        </div>
    `;
}

// Form Handlers
document.getElementById('vehiculoForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const vehiculo = {
        tipoVehiculo: document.getElementById('tipoVehiculo').value,
        placa: document.getElementById('placa').value.toUpperCase(),
        tipoServicio: document.getElementById('tipoServicio').value,
        combustible: document.getElementById('combustible').value,
        capacidadPasajeros: parseInt(document.getElementById('capacidadPasajeros').value),
        color: document.getElementById('color').value.toUpperCase(),
        modelo: parseInt(document.getElementById('modelo').value),
        marca: document.getElementById('marca').value,
        linea: document.getElementById('linea').value
    };
    
    // Solo validar y agregar documentos si estamos creando (no editando)
    if (!editingVehiculoId) {
        const documentoId = document.getElementById('documentoSelect').value;
        const fechaExpedicion = document.getElementById('fechaExpedicion').value;
        const fechaVencimiento = document.getElementById('fechaVencimiento').value;
        
        if (!documentoId) {
            showToast('Debes seleccionar al menos un documento', 'error');
            return;
        }
        
        if (!fechaExpedicion || !fechaVencimiento) {
            showToast('Debes ingresar las fechas del documento', 'error');
            return;
        }
        
        vehiculo.documentos = [
            {
                documento: {
                    id: parseInt(documentoId)
                },
                fechaExpedicion: fechaExpedicion,
                fechaVencimiento: fechaVencimiento
            }
        ];
    }
    
    console.log('Enviando vehículo:', JSON.stringify(vehiculo, null, 2));
    console.log('Modo edición:', editingVehiculoId ? 'ACTUALIZAR (ID: ' + editingVehiculoId + ')' : 'CREAR');
    
    try {
        const url = editingVehiculoId ? `${baseUrl}/api/vehiculos/${editingVehiculoId}` : `${baseUrl}/api/vehiculos`;
        const method = editingVehiculoId ? 'PUT' : 'POST';
        
        console.log('URL:', url);
        console.log('Método:', method);
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehiculo)
        });
        
        console.log('Respuesta servidor - Status:', response.status);
        
        if (response.ok) {
            const vehiculoActualizado = await response.json();
            console.log('Vehículo guardado:', vehiculoActualizado);
            showToast(editingVehiculoId ? 'Vehículo actualizado exitosamente' : 'Vehículo registrado exitosamente');
            
            // Resetear formulario
            document.getElementById('vehiculoForm').reset();
            document.getElementById('vehiculoFormCard').style.display = 'none';
            editingVehiculoId = null;
            
            // Restaurar título y botón
            document.querySelector('#vehiculoFormCard h3').textContent = 'Nuevo Vehículo';
            document.querySelector('#vehiculoForm button[type="submit"]').textContent = 'Guardar Vehículo';
            
            // Restaurar campos de documentos
            const documentosSection = document.querySelector('.documentos-section');
            const documentoSelect = document.getElementById('documentoSelect');
            const fechaExpedicion = document.getElementById('fechaExpedicion');
            const fechaVencimiento = document.getElementById('fechaVencimiento');
            
            documentosSection.style.display = 'block';
            documentoSelect.disabled = false;
            fechaExpedicion.disabled = false;
            fechaVencimiento.disabled = false;
            documentoSelect.setAttribute('required', 'required');
            fechaExpedicion.setAttribute('required', 'required');
            fechaVencimiento.setAttribute('required', 'required');
            
            await loadVehiculos();
            console.log('Lista de vehículos recargada');
        } else {
            const contentType = response.headers.get('content-type');
            let errorMsg = editingVehiculoId ? 'Error al actualizar vehículo' : 'Error al registrar vehículo';
            
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                errorMsg = errorData.message || JSON.stringify(errorData);
            } else {
                errorMsg = await response.text();
            }
            
            console.error('Error del servidor:', errorMsg);
            showToast(errorMsg, 'error');
        }
    } catch (error) {
        console.error('Error completo:', error);
        showToast('Error de conexión: ' + error.message, 'error');
    }
});

document.getElementById('documentoForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const documento = {
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        tipoVehiculoAplica: document.getElementById('tipoVehiculoAplica').value,
        obligatorio: document.getElementById('obligatorio').value,
        descripcion: document.getElementById('descripcion').value
    };
    
    try {
        // Determinar si es creación o actualización
        const isEdit = editingDocumentoId !== null;
        const url = isEdit ? `${baseUrl}/api/documentos/${editingDocumentoId}` : `${baseUrl}/api/documentos`;
        const method = isEdit ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(documento)
        });
        
        if (response.ok) {
            showToast(isEdit ? 'Documento actualizado exitosamente' : 'Documento registrado exitosamente');
            document.getElementById('documentoForm').reset();
            document.getElementById('documentoFormCard').style.display = 'none';
            
            // Resetear modo edición
            editingDocumentoId = null;
            const submitBtn = document.querySelector('#documentoForm button[type="submit"]');
            submitBtn.textContent = 'Guardar Documento';
            
            loadDocumentos();
        } else {
            showToast(isEdit ? 'Error al actualizar documento' : 'Error al registrar documento', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
});

// Search Functions
async function buscarPorPlaca() {
    const placa = document.getElementById('searchPlacaInput').value.trim();
    if (!placa) {
        showToast('Ingrese una placa', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${baseUrl}/api/vehiculos/buscar/placa/${placa}`);
        if (response.ok) {
            const vehiculo = await response.json();
            displaySearchResults([vehiculo]);
        } else {
            showToast('No se encontró vehículo con esa placa', 'error');
            displaySearchResults([]);
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la búsqueda', 'error');
    }
}

async function buscarPorTipo() {
    const tipo = document.getElementById('searchTipoInput').value;
    
    try {
        const response = await fetch(`${baseUrl}/api/vehiculos/buscar/tipo/${tipo}`);
        const vehiculos = await response.json();
        displaySearchResults(vehiculos);
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la búsqueda', 'error');
    }
}

async function buscarPorDocumento() {
    const documento = document.getElementById('searchDocumentoInput').value.trim();
    if (!documento) {
        showToast('Ingrese un nombre de documento', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${baseUrl}/api/vehiculos/buscar/documento/${documento}`);
        const vehiculos = await response.json();
        displaySearchResults(vehiculos);
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la búsqueda', 'error');
    }
}

async function buscarPorEstado() {
    const estado = document.getElementById('searchEstadoInput').value;
    
    try {
        const response = await fetch(`${baseUrl}/api/vehiculos/buscar/estado/${encodeURIComponent(estado)}`);
        const vehiculos = await response.json();
        displaySearchResults(vehiculos);
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la búsqueda', 'error');
    }
}

function displaySearchResults(vehiculos) {
    const resultsDiv = document.getElementById('searchResults');
    
    if (vehiculos.length === 0) {
        resultsDiv.innerHTML = '<div class="empty-state"><p>No se encontraron resultados</p></div>';
        return;
    }
    
    resultsDiv.innerHTML = vehiculos.map(v => createVehiculoCard(v)).join('');
    showToast(`Se encontraron ${vehiculos.length} resultado(s)`);
}

// Search filter
document.getElementById('searchVehiculo')?.addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const items = document.querySelectorAll('#vehiculosList .list-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(search) ? 'block' : 'none';
    });
});

// Editar vehículo
async function editarVehiculo(id) {
    try {
        const response = await fetch(`${baseUrl}/api/vehiculos/${id}`);
        if (response.ok) {
            const vehiculo = await response.json();
            
            // Cambiar a la sección de vehículos si estamos en otra
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-section="vehiculos"]').classList.add('active');
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById('vehiculos-section').classList.add('active');
            
            // Abrir formulario en modo edición
            await toggleVehiculoForm(vehiculo);
        } else {
            showToast('Error al cargar el vehículo', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
}

// Confirmar eliminar vehículo
function confirmarEliminarVehiculo(id, placa) {
    if (confirm(`¿Estás seguro de eliminar el vehículo con placa ${placa}?`)) {
        eliminarVehiculo(id);
    }
}

// Eliminar vehículo
async function eliminarVehiculo(id) {
    try {
        const response = await fetch(`${baseUrl}/api/vehiculos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            showToast('Vehículo eliminado exitosamente');
            loadVehiculos();
        } else {
            showToast('Error al eliminar el vehículo', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
}

// Event delegation para botones de editar y eliminar VEHÍCULOS
document.addEventListener('click', async (e) => {
    // Botón editar vehículo
    const editBtn = e.target.closest('.btn-edit');
    if (editBtn) {
        const id = editBtn.dataset.vehiculoId;
        await editarVehiculo(id);
        return;
    }

    // Botón eliminar vehículo
    const deleteBtn = e.target.closest('.btn-delete');
    if (deleteBtn) {
        const id = deleteBtn.dataset.vehiculoId;
        const placa = deleteBtn.dataset.vehiculoPlaca;
        confirmarEliminarVehiculo(id, placa);
        return;
    }

    // Botón editar documento
    const editDocBtn = e.target.closest('.btn-edit-doc');
    if (editDocBtn) {
        const id = editDocBtn.dataset.docId;
        await editarDocumento(id);
        return;
    }

    // Botón eliminar documento
    const deleteDocBtn = e.target.closest('.btn-delete-doc');
    if (deleteDocBtn) {
        const id = deleteDocBtn.dataset.docId;
        const nombre = deleteDocBtn.dataset.docNombre;
        confirmarEliminarDocumento(id, nombre);
        return;
    }
});

// Event listeners para botones de búsqueda
document.getElementById('btnBuscarPlaca')?.addEventListener('click', buscarPorPlaca);
document.getElementById('btnBuscarTipo')?.addEventListener('click', buscarPorTipo);
document.getElementById('btnBuscarDocumento')?.addEventListener('click', buscarPorDocumento);
document.getElementById('btnBuscarEstado')?.addEventListener('click', buscarPorEstado);

// También permitir búsqueda con Enter
document.getElementById('searchPlacaInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarPorPlaca();
});
document.getElementById('searchDocumentoInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarPorDocumento();
});

// Variable para tracking de documento en edición
let editingDocumentoId = null;

// Editar documento
async function editarDocumento(id) {
    try {
        const response = await fetch(`${baseUrl}/api/documentos/${id}`);
        if (response.ok) {
            const documento = await response.json();
            
            // Rellenar el formulario
            document.getElementById('codigo').value = documento.codigo;
            document.getElementById('nombre').value = documento.nombre;
            document.getElementById('tipoVehiculoAplica').value = documento.tipoVehiculoAplica;
            document.getElementById('obligatorio').value = documento.obligatorio;
            document.getElementById('descripcion').value = documento.descripcion;
            
            // Guardar ID para actualización
            editingDocumentoId = id;
            
            // Cambiar texto del botón
            const submitBtn = document.querySelector('#documentoForm button[type="submit"]');
            submitBtn.textContent = 'Actualizar Documento';
            
            // Mostrar formulario
            document.getElementById('documentoFormCard').style.display = 'block';
            
            showToast('Documento cargado para edición', 'info');
        } else {
            showToast('Error al cargar el documento', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
}

// Confirmar eliminar documento
function confirmarEliminarDocumento(id, nombre) {
    if (confirm(`¿Estás seguro de eliminar el documento "${nombre}"?`)) {
        eliminarDocumento(id);
    }
}

// Eliminar documento
async function eliminarDocumento(id) {
    try {
        const response = await fetch(`${baseUrl}/api/documentos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            showToast('Documento eliminado exitosamente');
            loadDocumentos();
        } else {
            showToast('Error al eliminar el documento', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
}

// Initialize
loadVehiculos();
loadDocumentos();
