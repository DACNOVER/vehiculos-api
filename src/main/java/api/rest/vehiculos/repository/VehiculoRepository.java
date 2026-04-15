package api.rest.vehiculos.repository;

import api.rest.vehiculos.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {
    
    // Buscar vehículo por placa
    Optional<Vehiculo> findByPlaca(String placa);
    
    // Buscar vehículos por tipo de vehículo
    List<Vehiculo> findByTipoVehiculo(Vehiculo.TipoVehiculo tipoVehiculo);
    
    // Buscar vehículos que tienen un tipo de documento específico
    @Query("SELECT DISTINCT v FROM Vehiculo v JOIN v.documentos vd JOIN vd.documento d WHERE d.nombre = :nombreDocumento")
    List<Vehiculo> findByTipoDocumento(@Param("nombreDocumento") String nombreDocumento);
    
    // Buscar vehículos por estado de documento
    @Query("SELECT DISTINCT v FROM Vehiculo v JOIN v.documentos vd WHERE vd.estado = :estado")
    List<Vehiculo> findByEstadoDocumento(@Param("estado") String estado);
}
