package api.rest.vehiculos.service;

import api.rest.vehiculos.entity.Vehiculo;
import api.rest.vehiculos.entity.VehiculoDocumento;
import api.rest.vehiculos.repository.VehiculoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService {

    private final VehiculoRepository repository;

    public VehiculoService(VehiculoRepository repository) {
        this.repository = repository;
    }

    public Vehiculo guardar(Vehiculo dto) {
        // Validar que el vehículo tenga al menos un documento
        if (dto.getDocumentos() == null || dto.getDocumentos().isEmpty()) {
            throw new IllegalArgumentException("El vehículo debe tener al menos un documento asociado");
        }

        // Establecer estado inicial "En Verificación" para todos los documentos
        for (VehiculoDocumento vd : dto.getDocumentos()) {
            vd.setEstado("En Verificación");
            vd.setVehiculo(dto);
        }

        return repository.save(dto);
    }

    public List<Vehiculo> listarTodos() {
        return repository.findAll();
    }

    public Optional<Vehiculo> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Vehiculo actualizar(Long id, Vehiculo dto) {
        Vehiculo vehiculo = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado con id: " + id));

        vehiculo.setTipoVehiculo(dto.getTipoVehiculo());
        vehiculo.setPlaca(dto.getPlaca());
        vehiculo.setTipoServicio(dto.getTipoServicio());
        vehiculo.setCombustible(dto.getCombustible());
        vehiculo.setCapacidadPasajeros(dto.getCapacidadPasajeros());
        vehiculo.setColor(dto.getColor());
        vehiculo.setModelo(dto.getModelo());
        vehiculo.setMarca(dto.getMarca());
        vehiculo.setLinea(dto.getLinea());

        return repository.save(vehiculo);
    }

    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Vehículo no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }

    public Vehiculo agregarDocumento(Long vehiculoId, VehiculoDocumento vehiculoDocumento) {
        Vehiculo vehiculo = repository.findById(vehiculoId)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado con id: " + vehiculoId));

        vehiculoDocumento.setEstado("En Verificación");
        vehiculo.addDocumento(vehiculoDocumento);

        return repository.save(vehiculo);
    }

    // Métodos de búsqueda personalizados
    public Optional<Vehiculo> buscarPorPlaca(String placa) {
        return repository.findByPlaca(placa);
    }

    public List<Vehiculo> buscarPorTipoVehiculo(Vehiculo.TipoVehiculo tipoVehiculo) {
        return repository.findByTipoVehiculo(tipoVehiculo);
    }

    public List<Vehiculo> buscarPorTipoDocumento(String nombreDocumento) {
        return repository.findByTipoDocumento(nombreDocumento);
    }

    public List<Vehiculo> buscarPorEstadoDocumento(String estado) {
        return repository.findByEstadoDocumento(estado);
    }
}