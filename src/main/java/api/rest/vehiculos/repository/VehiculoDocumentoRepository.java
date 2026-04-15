package api.rest.vehiculos.repository;

import api.rest.vehiculos.entity.VehiculoDocumento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiculoDocumentoRepository extends JpaRepository<VehiculoDocumento, Long> {
}
