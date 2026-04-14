package api.rest.vehiculos.repository;

import api.rest.vehiculos.entity.Documento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
}