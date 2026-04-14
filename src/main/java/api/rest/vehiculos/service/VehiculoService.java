package api.rest.vehiculos.service;

import api.rest.vehiculos.entity.Vehiculo;
import api.rest.vehiculos.repository.VehiculoRepository;
import org.springframework.stereotype.Service;

@Service
public class VehiculoService {

    private final VehiculoRepository repository;

    public VehiculoService(VehiculoRepository repository) {
        this.repository = repository;
    }

    public Vehiculo guardar(Vehiculo dto) {

        Vehiculo v = new Vehiculo();

        v.setTipoVehiculo(dto.getTipoVehiculo());
        v.setPlaca(dto.getPlaca());
        v.setTipoServicio(dto.getTipoServicio());
        v.setCombustible(dto.getCombustible());
        v.setCapacidadPasajeros(dto.getCapacidadPasajeros());
        v.setColor(dto.getColor());
        v.setModelo(dto.getModelo());
        v.setMarca(dto.getMarca());
        v.setLinea(dto.getLinea());

        return repository.save(v);
    }
}